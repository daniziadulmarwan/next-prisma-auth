export async function POST(request: Request) {
  let body = request.json();
  return Response.json(body);
}
