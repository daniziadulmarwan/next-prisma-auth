import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  let body = await request.json();
  let { fullname, email, password } = body;

  // 1. check user exist
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user) {
    return Response.json({ message: "User registered" }, { status: 400 });
  }

  // 2. hash password
  const hashedPassword = await hash(password, 10);

  // 3. create account
  try {
    await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
        password: hashedPassword,
      },
    });
    return Response.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return Response.json(error);
  }
}
