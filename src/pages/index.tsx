import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Discussion, Match, Post, Team } from "@/database/models";
import { getPosts } from "@/services/post";
import PostCard from "@/components/post";
import { getRootDiscussions } from "@/services/discussion";
import DiscussionCard from "@/components/discussion";
import { getMatches } from "@/services/match";
import TeamsTable from "./teams/teamsTable";
import { getTeams } from "@/services/team";
import Button from "@/components/form/elements/button";

export default function Home({posts, discussions, teams}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
   return <div className="mt-10 mx-2">
      
      <div>
         <h1 className="text-xl ml-5">Top Teams</h1>
         <div className="mt-2">
            <TeamsTable teams={teams} />
            <div className="mt-2">
               <Button href="/teams" block dense variant="outline">See full ranking</Button>
            </div>
         </div>
      </div>

      <div className="mt-10">
         <h1 className="text-xl ml-5">Latest News</h1>
         <div>
            {posts.map((post, i) => <div className="mt-2 shadow-lg"><PostCard post={post} key={i} /></div>)}
         </div>
         <div className="mt-2">
            <Button href="/posts" block dense variant="outline">See All Posts</Button>
         </div>
         
      </div>
      
      <div className="mt-10">
         <h1 className="text-xl ml-5">Latest Discussions</h1>
         <div>
            {
               discussions.map(
                  (discussion, i) => <div className="mt-2 shadow-lg">
                     <DiscussionCard key={i} discussion={discussion}></DiscussionCard>
                  </div>
               )
            }
         </div>
      </div>
      <div className="mt-2">
         <Button href="/discussions" block dense variant="outline">See All Discussions</Button>
      </div>
   </div>
}


export const getServerSideProps: GetServerSideProps<{
   posts: Post[], 
   discussions: Discussion[], 
   teams: Team[]
}> = async ({req, res}) => {

   const posts = await getPosts({include: {association: "author" }});
   const discussions = await getRootDiscussions({include: {association: "author"}})
   const teams = await getTeams();
   return {
      props: {
         posts: JSON.parse(JSON.stringify(posts)),
         discussions: JSON.parse(JSON.stringify(discussions)),
         teams: JSON.parse(JSON.stringify(teams)),
      }
   }
}
