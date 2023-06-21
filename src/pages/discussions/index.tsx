import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import DiscussionService from "@/services/discussion"
import { Sequelize } from "sequelize";
import Button from "@/components/form/elements/button";
import DiscussionView from "@/components/discussion/DiscussionCard";
import container, { getService } from "@/container";
import { DiscussionData } from "@/database/models/discussion";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "@/store/actions";
import { selectDiscussionById } from "@/store/discussionSlice";


export default function AllDiscussions() {

    return <div></div>

}