var builder = WebApplication.CreateBuilder(args);

// Legger til API-kontrollere
builder.Services.AddControllers();

// Aktiverer Swagger for API-dokumentasjon
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Konfigurerer CORS for å tillate frontend (React) å koble til backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Tillater kun React-appen
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Bruk CORS-policy
app.UseCors("AllowReactApp");

// Konfigurerer Swagger kun i utviklingsmiljø
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection(); (Commented this part out)
app.UseAuthorization();

// Bruk API-kontrollere
app.MapControllers();

app.Run();
