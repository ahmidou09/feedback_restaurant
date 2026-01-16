const dns = require('dns');

// Try using Google DNS
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  console.log('Set DNS servers to Google DNS');
} catch (e) {
  console.log('Could not set DNS servers:', e.message);
}

console.log('Attempting to resolve SRV...');
dns.resolveSrv('_mongodb._tcp.cluster0.l04hvab.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('Error resolving SRV:', err);
  } else {
    console.log('SRV Records:', JSON.stringify(addresses, null, 2));
  }
});
