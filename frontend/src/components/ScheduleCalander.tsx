import Calendar from 'react-calendar';

export const MyCalendar = () => {
  const today = new Date();

  const dateCellRenderer = (date:any) => {
    if (date.toDateString() === today.toDateString()) {
      return (
        <div style={{ backgroundColor: 'blue' }}>
          {date.getDate()}
        </div>
      );
    }
    return date.getDate();
  };

  return (
    <Calendar
    //   dateCellRenderer={dateCellRenderer}
    />
  );
}