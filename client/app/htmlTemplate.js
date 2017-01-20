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
        </body>
    </html>
`;
