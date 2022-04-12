import React, {useEffect, useState} from 'react';
import {CustomImage} from '@components/Cards';
import MasterLayout from '@components/MasterLayout';
import veryHappy from '@assets/images/veryHappy/veryHappy.png';
import GLOBALS from '@constants';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '@actions';
import {Link} from 'react-router-dom';
import downloadIcon from '@assets/images/downloadIcon.png';
const {COLORS, IMAGE_BASE_URL} = GLOBALS;
const {BUTTON_ORANGE, LIGHT_GRAY} = COLORS;
const Exercises = () => {
  const [weekOne, setWeekOne] = useState([]);
  const {programFiles} = useSelector((state) => state.moduleOne);
  const dispatch = useDispatch();
  const exerciseData = [
    {id: 1, title: 'Balance'},
    {id: 2, title: 'Good experience Piggy Bank'},
    {id: 3, title: 'Balance'},
    {id: 4, title: 'Good experience Piggy Bank'},
    {id: 5, title: 'Balance'},
    {id: 6, title: 'Good experience Piggy Bank'},
    {id: 7, title: 'Balance'},
    {id: 8, title: 'Good experience Piggy Bank'},
  ];
  useEffect(() => {
    dispatch(AppActions.getProgramFiles());
  }, []);
  useEffect(() => {
    if (programFiles.length) {
      let weekOneData = programFiles
        .filter((item) => {
          return item.week === 1;
        })
        .map((val) => {
          return val;
        });
      setWeekOne(weekOneData);
    }
  }, [programFiles]);
  return (
    <MasterLayout>
      <div
        style={{
          width: '70%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <div style={{paddingTop: '80px'}}>
          <p style={{fontSize: '26px', color: BUTTON_ORANGE}}>
            Exercises to practice during the week
          </p>

          <div
            className="row container"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            {exerciseData.length
              ? exerciseData.map((item) => {
                  return (
                    <div className="col-md-3">
                      <div
                        style={{
                          marginTop: '30px',
                          marginBottom: '50px',
                        }}>
                        <CustomImage
                          src={veryHappy}
                          style={{
                            border: '1px solid red',
                            width: '100px',
                            height: '100px',
                          }}
                        />
                        <p style={{textAlign: 'center'}}>{item.title}</p>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <p style={{fontSize: '26px', color: BUTTON_ORANGE}}>
            Audio Exercises
          </p>
          <div className="row">
            {programFiles.length
              ? programFiles
                  .filter((val) => val.file_type === 'audio')
                  .map((item) => {
                    return (
                      <div className="col-md-4">
                        <div style={styles.readingWrapper}>
                          <div style={{width: '20%'}}>
                            <a href={`${IMAGE_BASE_URL}${item.file_name}`}>
                              <img src={downloadIcon} />
                            </a>
                          </div>
                          <div style={styles.downloadLink}>
                            <a
                              href={`${IMAGE_BASE_URL}${item.file_name}`}
                              style={{color: '#000'}}>
                              {item.file_name}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
              : null}
          </div>
          <p style={{fontSize: '26px', color: BUTTON_ORANGE}}>Reading</p>

          <p style={styles.weekTitle}>Week 1</p>
          <div className="row">
            {programFiles.length
              ? programFiles
                  .filter((val) => val.week === 1)
                  .map((item) => {
                    return (
                      <div className="col-md-4">
                        <Link to={`${IMAGE_BASE_URL}${item.file_name}`}>
                          <div style={styles.readingWrapper}>
                            <div style={{width: '20%'}}>
                              <img src={downloadIcon} />
                            </div>
                            <div style={styles.downloadLink}>
                              <div style={{color: '#000'}}>
                                {item.file_name}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
              : null}
          </div>
          <p style={styles.weekTitle}>Week 2</p>
          <div className="row">
            {programFiles.length
              ? programFiles
                  .filter((val) => val.week === 2)
                  .map((item) => {
                    return (
                      <div className="col-md-4">
                        <Link
                          to={`${IMAGE_BASE_URL}${item.file_name}`}
                          style={{color: '#000'}}>
                          <div style={styles.readingWrapper}>
                            <div style={{width: '20%'}}>
                              <img src={downloadIcon} />
                            </div>
                            <div style={styles.downloadLink}>
                              <div style={{color: '#000'}}>
                                {item.file_name}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
              : null}
          </div>
          <p style={styles.weekTitle}>Week 3</p>
          <div className="row">
            {programFiles.length
              ? programFiles
                  .filter((val) => val.week === 3)
                  .map((item) => {
                    return (
                      <div className="col-md-4">
                        <Link to={`${IMAGE_BASE_URL}${item.file_name}`}>
                          <div style={styles.readingWrapper}>
                            <div style={{width: '20%'}}>
                              <img src={downloadIcon} />
                            </div>
                            <div style={styles.downloadLink}>
                              <div style={{color: '#000'}}>
                                {item.file_name}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
              : null}
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};
export default Exercises;
const styles = {
  readingWrapper: {
    marginBottom: '50px',
    backgroundColor: LIGHT_GRAY,
    paddingTop: '10px',
    paddingBottom: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: '5px',
  },
  downloadLink: {
    width: '70%',
    paddingRight: '10px',
  },
  weekTitle: {fontSize: '16px', fontWeight: 'bold'},
};
