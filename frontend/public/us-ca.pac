function FindProxyForURL(url, host) {
	if (shExpMatch(url, "http*") && !isInNet(host, "192.168.0.0", "255.255.0.0"))
		return "PROXY us-ca.proxymesh.com:31280";
	else
		return "DIRECT";
}
