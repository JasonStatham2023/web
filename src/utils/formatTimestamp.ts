import moment from 'moment';

export const formatTimestamp = (
  timestamp:number
)=>{
  return moment(timestamp).utcOffset(+60).format('YYYY-MM-DD HH:mm:ss');
};