var builder = WebApplication.CreateBuilder(args);

// Adds API controllers to the application
builder.Services.AddControllers();

// Enables Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configures CORS (Cross-Origin Resource Sharing) to allow frontend (React) to connect
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Only allows requests from React app
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Applies the CORS policy
app.UseCors("AllowReactApp");

// Enables Swagger UI only in development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirects HTTP to HTTPS
app.UseHttpsRedirection();

// Enables authorization (can be removed if not needed)
app.UseAuthorization();

// Maps API controllers
app.MapControllers();

// Starts the application
app.Run();
