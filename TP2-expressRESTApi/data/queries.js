const query = require('../data/database.js');

const getPage = async (table, page, limit, fullUrl) => {
    const countSql = `SELECT COUNT(*) FROM ${table};`;

    const { rows: { length } } = await query(countSql);
    const total_count = length || 0;

    let pagedResponse = {
        pages: 0,
        first_page: '',
        last_page: '',
        prev_page: '',
        next_page: '',
        page_size: limit,
        total_count,
        data: []
    };

    if (total_count === 0) {
        return pagedResponse;
    }

    const sql = `SELECT *
                    FROM ${table}
                    OFFSET ${(page - 1) * limit}
                    LIMIT ${limit};`;

    const { rows } = await query(sql);

    let queryParams = new URLSearchParams();

    const firstPageNo = 1;
    queryParams.set('page', firstPageNo);
    queryParams.set('limit', limit);
    const firstPageUrl = [fullUrl, '?', queryParams.toString()].join('');

    const lastPageNo = parseInt(Math.ceil(total_count / limit), 10);
    queryParams.set('page', lastPageNo);
    queryParams.set('limit', limit);
    const lastPageUrl = [fullUrl, '?', queryParams.toString()].join('');

    const prevPageNo = (page > firstPageNo) ? page - 1 : firstPageNo;
    queryParams.set('page', prevPageNo);
    queryParams.set('limit', limit);
    const prevPageUrl = [fullUrl, '?', queryParams.toString()].join('');

    const nextPageNo = (page < lastPageNo) ? page + 1 : lastPageNo;
    queryParams.set('page', nextPageNo);
    queryParams.set('limit', limit);
    const nextPageUrl = [fullUrl, '?', queryParams.toString()].join('');

    pagedResponse = {
        pages: lastPageNo,
        first_page: firstPageUrl,
        last_page: lastPageUrl,
        prev_page: prevPageUrl,
        next_page: nextPageUrl,
        page_size: limit,
        total_count,
        rows
    };

    return pagedResponse;
}

const getById = async (table, id) => {
    const sql = `SELECT  *
                    FROM ${table} tab
                    WHERE tab.id = '${id}'`;

    const { rows } = await query(sql);
    return rows?.[0];
}

const create = async (table, doc) => {
    const columns = Object.keys(doc).join(', ');
    const values = Object.values(doc).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
    const sql = `INSERT INTO ${table}
                    (${columns}, created_at, updated_at)
                    VALUES (${values}, current_timestamp at time zone 'utc', current_timestamp at time zone 'utc')
                    RETURNING *;`;

    const { rows } = await query(sql, [doc.name, doc.age, doc.email, doc.address]);
    return rows?.[0];
}

const update = async (table, id, doc) => {
    const setClause = Object.entries(doc).map(([key, value]) => {
        return typeof value === 'string' ? `${key} = '${value}'` : `${key} = ${value}`;
    }).join(', ');
    const sql = `UPDATE ${table}
                    SET ${setClause},
                    updated_at = now()
                    WHERE id = '${id}'
                    RETURNING *;`;

    const { rows } = await query(sql);
    return rows?.[0];
}

const remove = async (table, id) => {
    const sql = `DELETE
                    FROM ${table} tab
                    WHERE tab.id = '${id}';`;

    return query(sql);
}

module.exports = {
    create,
    getById,
    remove,
    update,
    getPage
}