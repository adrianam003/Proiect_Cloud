import {sendMethodNotAllowed, sendOk,} from '@/utils/apiMethods.js';
import {getCollection} from "@/utils/functions";
import {ObjectId,} from 'mongodb';
const COLLECTION_NAME = 'tracks';

const getTracks = async () => {
	const collection = await getCollection(COLLECTION_NAME);
	return await collection.find({}).toArray();
}


const getTrack = async (id) => {
    const collection = await getCollection(COLLECTION_NAME);
    return await collection.findOne({_id: ObjectId.createFromHexString(id)});
}

const postTrack = async (track) => {
	const collection = await getCollection(COLLECTION_NAME);
	return await collection.insertOne(track);
}

const putTrack = async (track) => {
	const collection = await getCollection(COLLECTION_NAME);
	const id = track._id;
	delete track._id;
	return collection.updateOne({_id: new ObjectId(id)}, {$set: track});
}

const deleteTrack = async (id) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.deleteOne({_id: new ObjectId(id)});
}

export default async function handler(req, res) {

	const isAllowedMethod = req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE';
	if(!isAllowedMethod) {
		return sendMethodNotAllowed(res, 'Method is not allowed!');
	}

	if(req.method === 'GET' && req.query.id) {
		const id = req.query.id;
		const track = await getTrack(id);
		return sendOk(res, track);
	}
	else if(req.method === 'GET') {
		const tracks = await getTracks();
		return sendOk(res, tracks);
	}
	else if(req.method === 'POST') {
		const track = req.body;
		const result = await postTrack(track);
		return sendOk(res, result);
	}
	else if(req.method === 'PUT') {
		const track = req.body;
		const result = await putTrack(track);
		return sendOk(res, result);
	}
	else if(req.method === 'DELETE') {
		const id = req.query.id;
		const result = await deleteTrack(id);
		return sendOk(res, result);
	}
}