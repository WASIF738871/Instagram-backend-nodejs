import httpStatus from 'http-status';

const getOverview = (req, res) => {
  res.status(httpStatus.OK).render('base', {
    tour: 'This is forest hiker',
    user: 'jonas',
  });
};

export default { getOverview };
