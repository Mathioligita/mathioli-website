// import { NextResponse } from 'next/server';

// const protectedPaths = ['/book','/'];

// export function middleware(request) {
//     const userToken = request.cookies.get('token')?.value;

//     // Check if the current path is protected
//     const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

//     if (isProtectedPath) {
//         // Create an HTML response with the message and countdown timer
//         const htmlResponse = `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <meta http-equiv="refresh" content="5;url=/">
//                 <title>Access Denied</title>
//                 <style>
//                     body {
//                         font-family: Arial, sans-serif;
//                         display: flex;
//                         justify-content: center;
//                         align-items: center;
//                         height: 100vh;
//                         margin: 0;
//                         background-color: #f0f0f0;
//                     }
//                     .message {
//                         background: white;
//                         padding: 20px;
//                         border-radius: 8px;
//                         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                         text-align: center;
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="message">
//                     <h1>Access Denied</h1>
//                     <p>Please login, you can't access this page. Please login first. Thank you.</p>
//                     <p id="countdown">Redirecting to the home page in <span id="timer">5</span> seconds...</p>
//                 </div>
//                 <script>
//                     let timeLeft = 5;
//                     const timerElement = document.getElementById('timer');
//                     const countdownInterval = setInterval(() => {
//                         timeLeft -= 1;
//                         timerElement.textContent = timeLeft;
//                         if (timeLeft <= 0) {
//                             clearInterval(countdownInterval);
//                         }
//                     }, 1000);
//                 </script>
//             </body>
//             </html>
//         `;

//         // Return the HTML response
//         return new NextResponse(htmlResponse, {
//             status: 200,
//             headers: {
//                 'Content-Type': 'text/html',
//             },
//         });
//     }

//     // If the path is not protected or the token is present, allow access
//     return NextResponse.next();
// }

// // ======================
// // ======================
// // ======================
// // ======================

// // import { NextResponse } from 'next/server';

// // export const config = {
// //     matcher: '/: /book*',
// // };

// // export function middleware(request) {
// //     return NextResponse.redirect(new URL('/', request.url));
// // }

// =============

import { NextResponse } from "next/server";

export function middleware(request) {
  const userToken = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Check if the path is allowed
  const isAllowedPath =
    pathname === "/" ||
    (pathname.startsWith("/book/") && pathname !== "/book/");

  if (!isAllowedPath) {
    // Redirect to the home page if the path is not allowed
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the path is allowed or the token is present, allow access
  return NextResponse.next();
}
