const endpoint = process.env.TIDBCLOUD_CHAT2QUERY_APP_URL_ENDPOINT;
const publicKey = process.env.TIDBCLOUD_CHAT2QUERY_APP_PUBLIC_KEY;
const privateKey = process.env.TIDBCLOUD_CHAT2QUERY_APP_PRIVATE_KEY;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const jobId = url.searchParams.get("job_id");
  if (!jobId) {
    return new Response(
      JSON.stringify({
        code: 400,
        message: "bad request, job_id is empty",
        data: {},
      }),
      { status: 400 }
    );
  }

  const jobStatusUrl = endpoint + `/v2/jobs/${jobId}`;

  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${publicKey}:${privateKey}`),
    },
  };

  let statusCode = 200;
  const res = await fetch(jobStatusUrl, fetchOptions).then((res) => {
    console.log(res.status);
    statusCode = res.status;
    return res.json();
  });

  return new Response(JSON.stringify(res), { status: statusCode });
}
