
const resolvers = (shows)=>({
    myQuery:{
        testFunction(){
            return "returned from custom test function";
        },
        
        getShowByName: async function(_,args){    
           var out= await shows.find({'shows.name':args.showSchemaName},{'shows.$':1,"title":2,"version":3});
          //var out= await shows.findOne();
            console.log(out[0].version);
            var outString=JSON.stringify(out[0]);
            var outStringJson=JSON.parse(outString);
            console.log(outStringJson.shows);
            console.log(outStringJson.shows[0]);
            
                         
            return out={
                _id:out[0]._id.toString(),
                title: out[0].title,
                version: out[0].version,
                showDetails: [{
                    name: outStringJson.shows[0].name,
                    genre: outStringJson.shows[0].genre,
                    lead_actor: outStringJson.shows[0].lead_actor
                }]
            }
            
            ;
        },
        
        
    },
    myMutation: {
        createShow: async function(_,args){

            var titleInsert=args.showTypeInputDetails.title;
            var versionInsert=args.showTypeInputDetails.version;
            var showDetailsInsert=[{
                "name":args.showTypeInputDetailsExtended.name,
                "genre":args.showTypeInputDetailsExtended.genre,
                "lead_actor":args.showTypeInputDetailsExtended.lead_actor
            }];

            var newShow=await new shows({
                title:titleInsert,
                version:versionInsert,
                showDetails:showDetailsInsert
            });
            await newShow.save();
            
            var out= await shows.find({'showDetails.name':args.showTypeInputDetailsExtended.name},{'showDetails.$':1,"title":2,"version":3});
            //var out= await shows.findOne();
            console.log(out);
            
            console.log(out[0].version);
            var outString=JSON.stringify(out[0]);
            var outStringJson=JSON.parse(outString);
            console.log(outStringJson.showDetails);
            console.log(outStringJson.showDetails[0].name);
            
            return args.showTypeInputDetails.title+","+args.showTypeInputDetails.version+","+
            args.showTypeInputDetailsExtended.name+","+args.showTypeInputDetailsExtended.genre+","+
            args.showTypeInputDetailsExtended.lead_actor;
                   
        }

    }
    
});

module.exports = resolvers;