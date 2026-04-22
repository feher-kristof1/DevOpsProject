using Microsoft.OpenApi;
using Microsoft.AspNetCore.HttpOverrides;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendDev", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",
                "http://localhost:8080",
            "http://feher-kristof1-matchresults-frontend.jcloud.jedlik.cloud",
            "https://feher-kristof1-matchresults-frontend.jcloud.jedlik.cloud")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseForwardedHeaders();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "MatchResult API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("FrontendDev");

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapMethods("/", new[] { "GET", "HEAD" }, () => Results.Ok(new
{
    service = "MatchResultBackend",
    status = "ok",
    endpoints = new[] { "/api/Match", "/healthz" }
}));

app.MapMethods("/healthz", new[] { "GET", "HEAD" }, () => Results.Ok(new { status = "healthy" }));

app.MapControllers();

app.Run();
