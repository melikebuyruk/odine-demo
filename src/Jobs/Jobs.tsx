import * as React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import CommentIcon from '@mui/icons-material/Comment';
import { fetchJobsWithCommentCounts, getTotalCommentCountByUserId, getCommentsByJobId } from '../services/userService';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { Job } from '../types/Job';

interface JobsProps {
  userId: number;
}

const Jobs: React.FC<JobsProps> = ({ userId }) => {
  const theme = useTheme();
  const [pastJobs, setPastJobs] = React.useState<(Job & { commentCount: number })[]>([]);
  const [jobComments, setJobComments] = React.useState<{ [key: number]: any[] }>({});
  const [showJobComments, setShowJobComments] = React.useState<{ [key: number]: boolean }>({});
  const [totalComments, setTotalComments] = React.useState(0);

  React.useEffect(() => {
    loadJobs();
  }, [userId]);

  const toggleJobComments = async (jobId: number) => {
    setShowJobComments((prev) => ({ ...prev, [jobId]: !prev[jobId] }));

    if (!jobComments[jobId]) {
      try {
        const comments = await getCommentsByJobId(jobId);
        setJobComments((prev) => ({ ...prev, [jobId]: comments }));
      } catch (error) {
        console.error(`Failed to fetch comments for job ${jobId}`, error);
      }
    }
  };

  const loadJobs = async () => {
    try {
      const jobs = await fetchJobsWithCommentCounts(userId);
      setPastJobs(jobs);

      const totalCommentCount = await getTotalCommentCountByUserId(userId);
      setTotalComments(totalCommentCount);
    } catch (error) {
      console.error('Failed to fetch jobs or comments:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: '16px' }}>
        Past Jobs
      </Typography>
      <Typography variant="subtitle1" style={{ marginBottom: '16px' }}>
        Total Comments: {totalComments}
      </Typography>
      <ul>
        {pastJobs.map((job) => (
          <li
            key={job.id}
            style={{
              marginBottom: '20px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          >
            <Typography paragraph>Job Title: {job.title}</Typography>
            <Typography paragraph>Job Body: {job.body}</Typography>
            <IconButton
              onClick={() => toggleJobComments(job.id)}
              style={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
              }}
            >
              <Badge badgeContent={job.commentCount || 0} color="primary">
                <CommentIcon />
              </Badge>
            </IconButton>
            {showJobComments[job.id] && (
              <CommentsContainer
                style={{
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.secondary,
                }}
              >
                <Typography paragraph>Comments:</Typography>
                <ul>
                  {(jobComments[job.id] || []).map((comment) => (
                    <li key={comment.id} style={{ marginBottom: '10px' }}>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        Name: {comment.name}
                      </Typography>
                      <Typography variant="body2" style={{ fontStyle: 'italic' }}>
                        Email: {comment.email}
                      </Typography>
                      <Typography variant="body2">Comment: {comment.body}</Typography>
                    </li>
                  ))}
                </ul>
              </CommentsContainer>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CommentsContainer = styled('div')`
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
`;

export default Jobs;
