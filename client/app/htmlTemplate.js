export default (head, bodyHtml) => `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
        <head>
            ${head.title.toString()}
            ${head.meta.toString()}
            ${head.link.toString()}
        </head>
        <body>
            <div id="root">${bodyHtml}</div>
            <script src="/app.js"></script>
			${process.env.NODE_ENV != "production" ? "<script src=\"http://localhost:35729/livereload.js\"></script>" : ""}
        </body>
    </html>
`;
