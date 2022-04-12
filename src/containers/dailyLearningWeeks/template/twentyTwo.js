import {useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';
import GLOBALS from '@constants';
import whiteHeart from '@assets/images/whiteHeart@3x.png';
import heart from '@assets/images/heart@3x.png';
import commentImg from '@assets/images/comment@3x.png';
import Rating from 'react-rating';
import {Modal, TouchableOpacity, Dimensions} from 'react-native';
import commonStyles from '@containers/dailyLearningWeeks/commonStyles';
import {translate as ts} from '@i18n/translate';
import blackStar from '@assets/images/blackStar.png';
import yellowStar from '@assets/images/yellowStar.png';
import {getItem} from '@utils/AsyncUtils';
import * as AppActions from '@actions';
import {useDispatch, useSelector} from 'react-redux';
import leftArrow from '@assets/images/leftArrow.svg';
import menu from '@assets/images/menu.svg';
import Menu from '@components/Menu';
import week1 from '@assets/images/Week1.svg';
import ExerciseBox from '@components/ExerciseBox';
import {
  CardQuote,
  CardTitle,
  CardTime,
  CardDescription,
  CardContent,
} from '@components/Cards';
const {COLORS, FONTS} = GLOBALS;
const {LIGHT_GRAY} = COLORS;
const DEVICE_WIDTH = Dimensions.get('window').width;
const TwentyTwo = (props) => {
  const [rating, setRating] = useState(0);
  const [like, setLike] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState([]);
  const [commentData, setCommentData] = useState('');
  const [commentError, setCommentError] = useState('');
  const [updateId, setUpdateId] = useState('');
  const {
    card_title,
    descriptions,
    card_time,
    content,
    quotes,
    week,
    showExercises,
  } = props.card;

  const dispatch = useDispatch();
  const {userRatingData = []} = useSelector((state) => state.moduleOne);
  const {isDashboardModal} = useSelector((state) => state.common);

  /***************Disable browser back button************** */
  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    history.go(0);
  };

  useEffect(() => {
    let userId = getItem('userId');
    let programId = getItem('programId');
    dispatch(AppActions.getUserRating(userId, programId, week));
  }, []);

  const getDataSet = (data, type) => {
    if (type === 'LIKE') {
      setLike(data);
    }
    if (type === 'STAR') {
      setRating(data);
    }
    if (type === 'COMMENT') {
      setCommentData([...data]);
    }
  };
  useEffect(() => {
    if (userRatingData.length) {
      let week_rating = userRatingData.filter((data) => {
        return data.week == props.week;
      });

      if (week_rating.length > 0) {
        const {comments, star, isLiked, _id} = week_rating[0];
        getDataSet(isLiked, 'LIKE');
        getDataSet(star, 'STAR');
        getDataSet(comments, 'COMMENT');
        setUpdateId(_id);
      } else {
        getDataSet(false, 'LIKE');
        getDataSet(null, 'STAR');
        getDataSet([], 'COMMENT');
      }
    }
  }, [userRatingData]);
  /***********************set input value function************* */

  const onHandleChange = (e, item) => {
    const {name, value} = e.target;
    if (name === 'comment') {
      setComment(value);
      setCommentError('');
    }
  };

  const submitHandler = (mode, isAPI, value) => {
    let params = {
      user_id: getItem('userId'),
      program_id: getItem('programId'),
      week: props.week,
    };
    if (mode === 'LIKE') {
      setLike(!value);
      params.isLiked = !value;
    }
    if (mode === 'STAR') {
      setRating(value);
      params.star = value;
    }
    if (mode === 'COMMENT') {
      params.comments = [{comment: value}];
      setComment('');
    }

    if (isAPI) {
      if (
        userRatingData &&
        userRatingData.filter((data) => data.week == props.week).length > 0
      ) {
        let updateParams = {
          id: updateId,
        };
        if (mode === 'LIKE') {
          setLike(!value);
          updateParams.isLiked = !value;
          dispatch(AppActions.updateUserRating(updateParams));
        }
        if (mode === 'STAR') {
          setRating(value);
          updateParams.star = value;
          dispatch(AppActions.updateUserRating(updateParams));
        }

        if (mode === 'COMMENT') {
          if (comment.length === 0) {
            setCommentError('Please add comment');
          } else if (comment !== '') {
            dispatch(AppActions.addUserRating(params, week));
          }
        }
      } else {
        if (mode === 'COMMENT') {
          if (comment.length === 0) {
            setCommentError('Please add comment');
          } else if (comment !== '') {
            dispatch(AppActions.addUserRating(params, week));
          }
        } else {
          dispatch(AppActions.addUserRating(params, week));
        }
      }
    }
  };
  /**************************On submit and update API hit ************ */

  return (
    <>
      {/**********************quotes************** */}
      {quotes && quotes.length
        ? quotes
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardQuote
                  key={index}
                  quote={item.quote.length ? ReactHtmlParser(item.quote) : []}
                />
              );
            })
        : []}
      <CardTitle title={ReactHtmlParser(card_title)} />
      <CardTime
        time={
          card_time === '1' ? `${card_time} Minute` : `${card_time} Minutes`
        }
      />

      {/**********************description************** */}
      {descriptions && descriptions.length
        ? descriptions
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardDescription
                  key={index}
                  description={ReactHtmlParser(item.desc)}
                />
              );
            })
        : []}
      {/**********************Star System************** */}

      <div style={styles.commentBox} className="g-box">
        <div
          className="g-like"
          style={styles.iconWithText}
          onClick={() => submitHandler('LIKE', true, like)}>
          {like === true ? (
            <img src={heart} style={styles.iconSize} />
          ) : (
            <img src={whiteHeart} style={styles.iconSize} />
          )}
          <p style={styles.socialTitle}>Like</p>
        </div>

        <div
          className="g-comment"
          style={styles.iconWithText}
          onClick={() => {
            setCommentModal(true);
          }}>
          <img src={commentImg} style={styles.iconSize} />
          <p style={styles.socialTitle}>Comment</p>
        </div>
        <div className="g-star" style={styles.iconWithText}>
          <p style={styles.socialTitle}>
            <Rating
              fractions={1}
              emptySymbol={<img src={blackStar} style={styles.starStyle} />}
              fullSymbol={<img src={yellowStar} style={styles.starStyle} />}
              initialRating={rating}
              onClick={(rate) => submitHandler('STAR', true, rate)}
            />
          </p>
        </div>
      </div>

      {/**********************content************** */}
      {content && content.length
        ? content
            .sort((a, b) => (a.order > b.order && 1) || -1)
            .map((item, index) => {
              return (
                <CardContent
                  key={index}
                  content={ReactHtmlParser(item.content)}
                />
              );
            })
        : []}
      {commentModal && (
        <Modal
          animationType="slide"
          visible={commentModal}
          onRequestClose={() => {
            setCommentModal(false);
          }}
          style={{
            backgroundColor: 'white',
          }}>
          <div style={{position: 'relative'}}>
            <img src={week1} style={{width: '100%'}} />
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => {
                dispatch(AppActions.dashboardModalAction(true));
                setCommentModal(false);
              }}>
              <img src={menu} />
            </TouchableOpacity>
          </div>
          <div
            style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}
            onClick={() => setCommentModal(false)}>
            <img src={leftArrow} style={styles.backButton} />
            Back
          </div>
          <div
            style={{
              overflowY: 'scroll',
              paddingBottom: '500%',
            }}>
            <div style={styles.commentWrapper}>
              {commentData.length
                ? commentData.map((item, i) => {
                    return (
                      <>
                        {item !== null ? (
                          <p key={i} style={styles.commentedData}>
                            {item.comment}
                          </p>
                        ) : null}
                      </>
                    );
                  })
                : []}
              <form noValidate style={{marginTop: '50px'}}>
                <div className="formRow">
                  <div className="w100">
                    <div className="formField has-icon">
                      <textarea
                        type="textarea"
                        className="f-field"
                        value={comment}
                        name="comment"
                        onChange={(e) => onHandleChange(e)}
                        required
                        maxLength={5000}
                        placeholder={'enter comment'}
                        style={styles.commentInputBox}
                      />
                    </div>
                  </div>
                  <span style={commonStyles.error}>{commentError}</span>
                </div>
              </form>

              <div style={{width: DEVICE_WIDTH > 767 ? '50%' : '68%'}}>
                <p
                  onClick={() => submitHandler('COMMENT', true, comment)}
                  className="btn-orange"
                  style={{
                    ...styles.rightText,
                    textAlign: 'center',
                  }}>
                  {ts('SAVE')}
                </p>
              </div>
            </div>
          </div>
          {/*********************************MODAL POPUP FOR MENU START*************** */}
          {isDashboardModal && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isDashboardModal}
              onRequestClose={() => {
                dispatch(AppActions.dashboardModalAction(false));
              }}>
              <Menu
                modalVisible={() =>
                  dispatch(AppActions.dashboardModalAction(false))
                }
              />
            </Modal>
          )}
          {/*********************************MODAL POPUP FOR MENU END*************** */}
        </Modal>
      )}
      {showExercises && <ExerciseBox week={week} />}
    </>
  );
};

export default TwentyTwo;
const styles = {
  contentText: {
    marginTop: '20px',
  },
  imageWrapper: {
    width: '180px',
    height: '180px',
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  imageTag: {width: '100%', height: '100%'},
  title: {
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
    border: '1px solid red',
    marginTop: '14px',
  },
  commentBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '30px',
    marginBottom: '30px',
    borderRadius: '40px',
    justifyContent: 'space-around',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: LIGHT_GRAY,
  },
  iconWithText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSize: {width: '40px', height: '40px'},
  socialTitle: {
    paddingTop: '9px',
    paddingLeft: '10px',
  },
  button: {
    width: '20%',
    marginBottom: '60px',
    marginTop: '40px',
  },
  commentInputBox: {
    backgroundColor: LIGHT_GRAY,
    fontStyle: 'italic',
    resize: 'none',
    paddingTop: '20px',
    height: '100px',
  },
  commentWrapper: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
  },
  backButton: {
    padding: '20px',
  },
  commentedData: {
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: LIGHT_GRAY,
  },
  starStyle: {width: '40px', height: '40px'},
  menuIcon: {
    position: 'absolute',
    top: '30%',
    right: '5%',
  },
  rightText: {
    paddingTop: '15px',
    paddingBottom: '15px',
    borderRadius: '5px',
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: '15px',
    height: 'auto',
    marginTop: '30px',
  },
};
