const shows=require('./models/shows');
const Handlebars=require('handlebars');

module.exports=function(server){

    server.views({
        engines:{
            html:Handlebars
        },
        relativeTo:__dirname,
        path:'templates'
    });

    server.route([{
        method: "GET",
        path:"/",
        handler: function(request,reply){
            return `<h1>Master NodeJS environment</h1>`;
        }
    },
    {
        method: "GET",
        path:"/shows",
        handler: function(request,reply){
            return shows.find();
        }
    },
    {
        method: "GET",
        path:"/graphqldemo",
        handler: {
            view: {
                template:'index',
                context:{
                    msg:'this is test'
                }
                
            }
        }
    },
    {
        method: "GET",
        path:"/frontEnd.js",
        handler: {
            file: 'frontEnd.js'
        }
    },
    {
        method: "POST",
        path:"/shows",
        handler: (request,reply) => {
            var {title,version,showDetails}=request.payload;
            console.log(request.payload);
            console.log("showDetails"+showDetails);
            console.log("title"+title);

            var newShow=new shows({
                title,
                version,
                showDetails
            });
            return newShow.save();
        }
    }]);
}