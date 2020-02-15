using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Api.SignalR
{
	public class MessageHub : Hub
	{
		public async Task NewMessage(Message msg)
		{
			await Clients.All.SendAsync("MessageReceived", msg);
		}
	}
}
