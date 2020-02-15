using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SignalR.Api.SignalR;

namespace SignalR.API
{
	public class Startup
	{
		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(options =>
			{
				options.AddPolicy("CorsPolicy", builder => builder
					.WithOrigins("http://localhost:4200")
					.AllowAnyMethod()
					.AllowAnyHeader()
					.AllowCredentials());
			});

			services.AddSignalR(options =>
			{
				options.EnableDetailedErrors = true;
				options.MaximumReceiveMessageSize = 2000;
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseRouting();

			app.UseCors("CorsPolicy");

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapHub<MessageHub>("/msg-hub", options =>
				{
					options.Transports =
						HttpTransportType.WebSockets |
						HttpTransportType.ServerSentEvents |
						HttpTransportType.LongPolling;
				});
			});
		}
	}
}
