import api from './api';
import axios from 'axios';
import { User } from '../types/User';
import { Job } from '../types/Job';

export const fetchUser = async (): Promise<User[]> => {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      api.get<User[]>('/users'),
      api.get('/posts'),
    ]);

    const users: User[] = usersResponse.data;
    const posts = postsResponse.data;

    const jobCountMap: { [key: number]: number } = {};
    posts.forEach((post: { userId: number }) => {
      jobCountMap[post.userId] = (jobCountMap[post.userId] || 0) + 1;
    });

    const usersWithJobCount = users.map((user) => ({
      ...user,
      jobCount: jobCountMap[user.id] || 0,
    }));

    return usersWithJobCount;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw new Error('Failed to fetch');
  }
};

export const searchByName = (users: User[], name: string): User[] => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const searchByJobCount = (users: User[], min: number, max: number): User[] => {
  return users.filter((user) => user.jobCount >= min && user.jobCount <= max);
};

export const searchByCity = (users: User[], city: string): User[] => {
  return users.filter((user) =>
    user.address.city.toLowerCase().includes(city.toLowerCase())
  );
};

export async function mockPhoto(): Promise<string[]> {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/images/search?limit=10");
    const result = response.data;
    if (result && result.length > 0) {
      return result.map((item: { url: string }) => item.url);
    } else {
      return Array(10).fill("https://via.placeholder.com/345x194");
    }
  } catch (error) {
    console.error("Error:", error);
    return Array(10).fill("https://via.placeholder.com/345x194");
  }
}

export const fetchJobsWithCommentCounts = async (userId: number): Promise<(Job & { commentCount: number })[]> => {
  try {
    const [postsResponse, commentsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts`),
      axios.get(`https://jsonplaceholder.typicode.com/comments`),
    ]);

    const posts = postsResponse.data;
    const comments = commentsResponse.data;
    const userJobs = posts.filter((post: { userId: number }) => post.userId === userId);
    const commentCountMap = comments.reduce((acc: { [key: number]: number }, comment: { postId: number }) => {
      acc[comment.postId] = (acc[comment.postId] || 0) + 1;
      return acc;
    }, {});
    const jobsWithCommentCounts = userJobs.map((job: Job) => ({
      ...job,
      commentCount: commentCountMap[job.id] || 0,
    }));

    return jobsWithCommentCounts;
  } catch (error) {
    console.error('Failed to fetch ', error);
    throw new Error('Failed to fetch');
  }
};

export const getCommentsByJobId = async (jobId: number): Promise<any[]> => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`);
    const comments = response.data;
    const jobComments = comments.filter((comment: { postId: number }) => comment.postId === jobId);

    return jobComments;
  } catch (error) {
    console.error(`Failed to fetch comments for job ${jobId}:`, error);
    throw new Error('Failed to fetch comments');
  }
};

export const getTotalCommentCountByUserId = async (userId: number): Promise<number> => {
  try {
    const [postsResponse, commentsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/posts`),
      axios.get(`https://jsonplaceholder.typicode.com/comments`),
    ]);

    const posts: Job[] = postsResponse.data;
    const comments = commentsResponse.data;
    const commentCountMap = comments.reduce((map: Map<number, number>, comment: { postId: number }) => {
      map.set(comment.postId, (map.get(comment.postId) || 0) + 1);
      return map;
    }, new Map());
    const totalComments = posts
      .filter((post) => post.userId === userId)
      .reduce((total, post) => total + (commentCountMap.get(post.id) || 0), 0);

    return totalComments;
  } catch (error) {
    console.error(`Failed to fetch`, error);
    throw new Error('Failed to fetch');
  }
};
