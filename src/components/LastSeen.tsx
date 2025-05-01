import { formatDistanceToNow } from 'date-fns';

const LastSeen = ({ date }: { date: Date }) => {
  return <span>{formatDistanceToNow(date, { addSuffix: true })}</span>;
};

export default LastSeen;
