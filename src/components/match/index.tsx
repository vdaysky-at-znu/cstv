import { Match } from "@/database/models";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MatchCard({tile=false, match, score}: {match: Match, score: number[], tile: boolean}) {
    const teamAWon = match?.winnerId == match?.teamA?.id
    const router = useRouter();
    
    return <div 
                className={(tile ? "border border-gray-300 " : " ") + "text-sm bg-gray-100"} 
                onClick={() => router.push("/matches/" + match.id)}
            >
                <div className=" py-3 px-5">
                    <div className="flex justify-between">
                    <div></div>
                    {/* Match as one line */}
                    { 
                        !match?.event?.name && <div className="flex">
                            <div className="flex"> 
                                <Link href={"/teams/" + match.teamAId} className="font-semibold">
                                    <span>{match.teamA?.name}</span>
                                    <img className="h-4 inline ms-1" src={match.teamA.logoUrl}></img>
                                </Link> 
                                <div className={"font-bold ms-2 " + (teamAWon ? "text-green-900": "text-red-800")} > { score[0] } </div> 

                            </div>
                            <span className="mx-2"> - </span>
                            <div className="flex">
                                <div className={"font-bold me-2 " + (!teamAWon ? "text-green-900": "text-red-800")}> { score[1] } </div> 
                                <Link href={"/teams/" + match.teamBId} className="font-semibold">
                                    <img className="w-4 inline me-1" src={match.teamB.logoUrl}></img>
                                    <span>{match.teamB?.name}</span>
                                </Link>
                            </div>
                        </div>
                    }

                    {
                        match?.event?.name && <div className="flex">
                            <div className="flex flex-col me-1">
                                <div className="w-full">
                                    <div>
                                        <Link href={"/teams/" + match.teamAId} className="font-semibold">
                                            <span>{match.teamA?.name}</span>
                                            <img className="h-4 inline ms-1" src={match.teamA.logoUrl}></img>
                                        </Link> 
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <Link href={"/teams/" + match.teamBId} className="font-semibold">
                                            <span>{match.teamB?.name}</span>
                                            <img className="w-4 inline ms-1" src={match.teamB.logoUrl}></img>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div className={"font-bold " + (teamAWon ? "text-green-900": "text-red-800")} > { score[0] } </div> 
                                <div className={"font-bold " + (!teamAWon ? "text-green-900": "text-red-800")}> { score[1] } </div> 
                            </div>
                        </div>
                    }
                    

                    { match?.event?.name && <div className="flex items-center justify-end">
                        <Link 
                            className="" 
                            href={"/events/" + match?.event?.id} 
                        >
                            <span className="whitespace-nowrap">{match?.event?.name}</span>
                        </Link>
                    </div>
                    }
                    <div></div>
                </div>
            </div>
        </div>
    
}
