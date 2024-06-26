import { Card, CardContent, Typography, Button } from '@mui/material';
import { IRoomCategory } from '../types/IRoomCategory';

interface RoomCardProps {
  roomCategory: IRoomCategory;
  onSelect: () => void;
}

const RoomCard = ({ roomCategory, onSelect }: RoomCardProps) => (
  <Card variant="outlined" className='mt-6'>
    <CardContent>
      <Typography variant="h6">{roomCategory.name}</Typography>
      {/* <Typography>Status: {roomCategory.status ? 'Available' : 'Not Available'}</Typography> */}
      <Typography>Rooms to Sell: {roomCategory.occupancy}</Typography>
      <Typography>Standard Rate: ${roomCategory.standard_rate}</Typography>
      <Button onClick={onSelect}>View Details</Button>
    </CardContent>
  </Card>
);

export default RoomCard;
