const fs = require('fs');
const path = require('path');

const schemasDir = path.join(path.resolve(), '/schema');
const schemaFiles = fs.readdirSync(schemasDir).filter(file => /^[A-Z][a-z]+[A-Z][a-z]+\.json$/.test(file));
let migrationText = '';

for (const file of schemaFiles) {
    const schemaPath = path.join(schemasDir, file);
    const schema = JSON.parse(fs.readFileSync(schemaPath));

    migrationText += `--${file.slice(0, -11)}
CREATE TABLE IF NOT EXISTS ${file.slice(0, -11)} (
id uuid PRIMARY KEY DEFAULT uuid_generate_v4()\n`;

    for (let field in schema.properties) {
        let type = schema.properties[field].type;

        if (type === 'integer' || type === 'number') {
            type = 'INT';
        } else if (type === 'string') {
            type = schema.properties[field]?.format == 'datetime' ? 'TIMESTAMPTZ NOT NULL DEFAULT NOW()' : 'VARCHAR(255)';
        }

        let nullable = !schema.required.includes(field);
        migrationText += `,${field} ${type} ${nullable ? '' : 'NOT NULL'}\n`;
    }

    migrationText += `);\n`;
}

const migrationFilename = `${new Date().toJSON()}-migration.sql`;
const migrationPath = path.join(path.resolve(), 'migrations', migrationFilename);
fs.writeFileSync(migrationPath, migrationText);

console.log(`Migration file ${migrationFilename} generated.`);