import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import PostService from "@/services/post";
import PostCard from "@/components/post";
import DiscussionCard from "@/components/discussion";
import TeamsTable from "./teams/teamsTable";
import TeamService from "@/services/team";
import Button from "@/components/form/elements/button";
import Input from "@/components/form/elements/input";
import TextArea from "@/components/form/elements/TextArea";
import { GSSPIsAdmin } from "@/services/utils";
import { IPost } from "@/database/models/post";
import { ITeam } from "@/database/models/team";
import { IDiscussion } from "@/database/models/discussion";
import DiscussionService from "@/services/discussion"

import container, { getService } from "@/container";

export default function Home({posts, discussions, teams, isAuthenticated}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
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
      <div>
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
      
      { 
         isAuthenticated && <div>
            <h2 className="text-lg mt-5 font-thin text-center">Write something</h2>
            <Input block color="bg-white" placeholder="Discussion Title" />
            <div className="mt-2">
               <TextArea placeholder="Discussion Text" />
            </div>
            
            <Button block  variant="outline"> Post </Button>
         </div> 
      }
      
   </div>
}


export const getServerSideProps: GetServerSideProps<{
   posts: IPost[], 
   discussions: IDiscussion[], 
   teams: ITeam[],
   isAuthenticated: boolean,
}> = GSSPIsAdmin(async ({req, res}) => {

   const postService = getService(PostService); 
   const discussionService = getService(DiscussionService);
   const teamService = getService(TeamService);

   const posts = await postService.getPosts({include: {association: "author" }});
   const discussions = await discussionService.getRootDiscussions({include: {association: "author"}})
   const teams = await teamService.getTeams();

   return {
      props: {
         posts: JSON.parse(JSON.stringify(posts)),
         discussions: JSON.parse(JSON.stringify(discussions)),
         teams: JSON.parse(JSON.stringify(teams)),
      }
   }
});
