using System;

namespace SignalR.Api.SignalR
{
	public class Message
	{
		public string ClientUniqueId { get; set; }
		public string Type { get; set; }
		public string Contents { get; set; }
		public DateTime Timestamp { get; set; }
	}
}
