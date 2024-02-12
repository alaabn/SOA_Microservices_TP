using Grpc.Core;
using Microsoft.EntityFrameworkCore;
using RecordStore.data;

namespace RecordStore.Services;

public class RecordStoreService : RecordStore.RecordStoreBase
{
    private readonly AppDbContext _db;
    public RecordStoreService(AppDbContext context)
    {
        _db = context;
    }

    public override async Task<RecordsStoreResponse> getRecords(GetRecordStoreRequest request, ServerCallContext context)
    {
        var response = new RecordsStoreResponse();
        var records = await _db.RecordStoreEnitys.ToListAsync();

        foreach (var rec in records)
        {
            response.Records.Add(new RecordStoreResponse
            {
                Id = rec.id,
                Name = rec.name
            });
        }

        return await Task.FromResult(response);
    }

    public override async Task<RecordStoreResponse> getRecordById(RecordStoreRequest request, ServerCallContext context)
    {
        var records = await _db.RecordStoreEnitys.FirstOrDefaultAsync(r => r.id == request.Id);

        if (records == null)
            throw new RpcException(new Status(StatusCode.NotFound, $"No Records with Id {request.Id}"));

        return await Task.FromResult(new RecordStoreResponse
        {
            Id = records.id,
            Name = records.name
        });
    }

    public override async Task<RecordStoreResponse> createRecord(CreateRecordRequest request, ServerCallContext context)
    {
        if (request.Name == string.Empty)
            throw new RpcException(new Status(StatusCode.InvalidArgument, "You must suppply a valid object"));

        var createdRecord = new RecordStoreEntity()
        {
            name = request.Name
        };

        await _db.AddAsync(createdRecord);
        await _db.SaveChangesAsync();

        return await Task.FromResult(new RecordStoreResponse
        {
            Id = createdRecord.id,
            Name = createdRecord.name
        });
    }

    public override async Task<RecordStoreDeletedResponse> deleteRecord(RecordStoreRequest request, ServerCallContext context)
    {
        if (request.Id == string.Empty)
            throw new RpcException(new Status(StatusCode.InvalidArgument, "resource doesn't exist"));

        var deletedRecord = await _db.RecordStoreEnitys.FirstOrDefaultAsync(r => r.id == request.Id);

        if (deletedRecord == null)
            throw new RpcException(new Status(StatusCode.NotFound, $"No Records with Id {request.Id}"));

        _db.Remove(deletedRecord);

        await _db.SaveChangesAsync();

        return await Task.FromResult(new RecordStoreDeletedResponse
        {
            Success = true
        });
    }
}