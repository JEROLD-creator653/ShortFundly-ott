export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>Shortfundly</ShortName>
  <Description>Search short films on Shortfundly</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" method="get" template="https://web.shortfundly.com/explore?q={searchTerms}"/>
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8"
    }
  });
}
