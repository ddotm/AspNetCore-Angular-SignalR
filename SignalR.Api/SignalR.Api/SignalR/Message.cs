using System;

namespace SignalR.Api.SignalR
{
	public class Message
	{
		public string ClientId { get; set; }
		public string MessageId { get; set; }
		public string UserName { get; set; }
		public string Type { get; set; }
		public string Contents { get; set; }
		public DateTime Timestamp { get; set; }
	}
}
