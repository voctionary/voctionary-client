import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DictionarySection from './components/DictionarySection';
import ListSection from './components/ListSection';
import TestSection from './components/TestSection';
import ProfileSection from './components/ProfileSection';
import SignInSection from './components/SignInSection';
import SignUpSection from './components/SignUpSection';
import PageStatusCode from './components/PageStatusCode';
import PageStatusCodeRoute from './components/PageStatusCodeRoute';
import ConfirmEmailSection from './components/ConfirmEmailSection';
import ResetPasswordSection from './components/ResetPasswordSection';
import Message from './components/Message';
import LoadingScreen from 'react-loading-screen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.js';
import ApiException from './model/ApiException';
import { SERVER_URL } from "./server";

const THEME = createTheme({
  typography: {
    fontFamily: '"Sora", "sans-serif"',
  },
});

function App() {
  const [ready, setReady] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);

  // DICTIONARY
  // from server
  const [languagesFrom, setLanguagesFrom] = useState(undefined);
  const [languagesTo, setLanguagesTo] = useState(undefined);
  const [words, setWords] = useState(undefined);
  const [word, setWord] = useState(undefined);
  // to server
  const [text, setText] = useState(undefined);
  const [languageFrom, setLanguageFrom] = useState(undefined);
  const [languageTo, setLanguageTo] = useState(undefined);

  // LIST
  const [wordLists, setWordLists] = useState(undefined);
  const [focusedWordList, setFocusedWordList] = useState(undefined);
  const [focusedWordListElement, setFocusedWordListElement] = useState(undefined);

  // TEST
  const [focusedWordListId, setFocusedWordListId] = useState(undefined);
  const [test, setTest] = useState({testType: undefined, testId: undefined, question: undefined, partOfSpeech: undefined, options: [], optionKeys: [], optionValues: []});
  const [testResult, setTestResult] = useState(undefined);

  const [message, setMessage] = useState({
    text: undefined,
    color: undefined,
    duration: undefined
  });
  const [showMessage, setShowMessage] = useState(false);

  const [error, setError] = useState({
    httpStatus: undefined,
    title: undefined,
    text: undefined,
    isReturn: undefined,
    returnPath: undefined,
    returnName: undefined
  });
  const [showError, setShowError] = useState(false);

  //api request
  const fetchUserInfo = async () => {
    await axios.get(SERVER_URL + "/api/getUserInfo", { withCredentials: true }).then(res => {
      if (res.status === 200 && res.data) {
        setUserInfo(res.data);
        setIsAuthorized(true);
      }
      else {
        setUserInfo(undefined);
        setIsAuthorized(false);
      }
    })
      .catch(error => {
        if(error.response.status === 401){
          setUserInfo(undefined);
          setIsAuthorized(false);
        }
        else{
          handleException(error.response.data);
        }
      });
  };

  const fetchLanguages = async () => {
    await axios.get(SERVER_URL + "/api/languages", { withCredentials: true })
      .then((res) => {
        if (res.status === 200 && res.data.from && res.data.to) {
          setLanguagesFrom(res.data.from);
          setLanguagesTo(res.data.to);
          setLanguageFrom(res.data.to[0]);
          setLanguageTo(res.data.to[0]);
        }
        else {
          handleError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        handleError(true, 404);
      });
  };

  //handlers
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /*
  const handleLanguageFrom = (language) => {
    setLanguageFrom(language);
  }

  const handleLanguageTo = (language) => {
    setLanguageTo(language);
  }*/

  const handleMessage = (showMessage = false, text = '', color = '#01bf71', duration = 3) => {
    setShowMessage(showMessage);
    setMessage({
      text: text,
      color: color,
      duration: duration
    });
  }

  const handleLoadingScreen = (isRendered = false) => {
    setIsLoading(isRendered);
  }

  const handleError = async (showError = false, httpStatusCode = 503, httpStatus = "Service Unavailable", text = "The Voctionary server does not respond", isReturn = false, returnPath = "/", returnName = "Home") => {
    setError({
      httpStatusCode: httpStatusCode,
      httpStatus: httpStatus,
      text: text,
      isReturn: isReturn,
      returnPath: returnPath,
      returnName: returnName
    });
    setShowError(showError);
  }

  const handleException = (exception = undefined) => {
    if(exception === undefined){
      handleError(true);
    }

    const apiException = new ApiException(exception);
    if (apiException.isError === true) {
      handleError(true, apiException.httpStatusCode, apiException.httpStatus, apiException.message);
    }
    else if (apiException.isError === false) {
      handleMessage(true, apiException.message);
    }
    else {
      handleError(true);
    }
  }

  const handleNavbar = (isRendered) => {
    setShowNavbar(isRendered);
  }


  //useEffect
  useEffect(() => {
    fetchUserInfo();
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (isAuthorized !== undefined && languageFrom && languageTo && languagesFrom && languagesTo) {
      setReady(true);
      setShowNavbar(true);
    }
  }, [isAuthorized, languageFrom, languageTo, languagesFrom, languagesTo]);


  useEffect(() => {
    if (showMessage) {
      setTimeout(function () {
        setShowMessage(false);
      }, message.duration * 1000);
    }
  }, [showMessage]);
  
  useEffect(() => {
    console.log(test);
}, [test]);

  return (
    <ThemeProvider theme={THEME}>
      {isLoading ?
        <LoadingScreen
          loading={isLoading}
          bgColor='rgba(255,255,255,0.5)'
          spinnerColor='#01bf71'
          textColor='black'
          text='Loading'
        ><></></LoadingScreen>
        : ''
      }

      {showError ? <PageStatusCode error={error} handleLoadingScreen={handleLoadingScreen} handleError={handleError} />
        :
        <>
          {!ready ? ''
            :
            <>
              {showNavbar ? <>
                <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} userInfo={userInfo} isAuthorized={isAuthorized}  wordId={word ? word.id : undefined} />
                <Navbar toggle={toggleSidebar} userInfo={userInfo} isAuthorized={isAuthorized} wordId={word ? word.id : undefined} />
              </> : ''}
              <Routes>
                <Route exact path="/" element={<DictionarySection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} isAuthorized={isAuthorized}
                  setLanguageFrom={setLanguageFrom} setLanguageTo={setLanguageTo} languagesFrom={languagesFrom} languagesTo={languagesTo} languageFrom={languageFrom} languageTo={languageTo}
                  word={word} setWord={setWord} words={words} setWords={setWords} text={text} setText={setText}
                />}></Route>
                <Route exact path="/word" element={<DictionarySection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} isAuthorized={isAuthorized}
                  setLanguageFrom={setLanguageFrom} setLanguageTo={setLanguageTo} languagesFrom={languagesFrom} languagesTo={languagesTo} languageFrom={languageFrom} languageTo={languageTo}
                  word={word} setWord={setWord} words={words} setWords={setWords} text={text} setText={setText}
                />}></Route>
                <Route exact path="/word/:id" element={<DictionarySection handleLoadingScreen={handleLoadingScreen} handleMessage={handleMessage} isAuthorized={isAuthorized}
                  setLanguageFrom={setLanguageFrom} setLanguageTo={setLanguageTo} languagesFrom={languagesFrom} handleException={handleException} languagesTo={languagesTo} languageFrom={languageFrom} languageTo={languageTo}
                  word={word} setWord={setWord} words={words} setWords={setWords} text={text} setText={setText}
                />}></Route>
                <Route exact path="/confirmEmail" element={<ConfirmEmailSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} fetchUserInfo={fetchUserInfo} />}></Route>
                {isAuthorized ?
                  <>
                    <Route exact path="/list" element={<ListSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} wordLists={wordLists} setWordLists={setWordLists} focusedWordList={focusedWordList} setFocusedWordList={setFocusedWordList} focusedWordListElement={focusedWordListElement} setFocusedWordListElement={setFocusedWordListElement} />}></Route>
                    <Route exact path="/test" element={<TestSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} wordLists={wordLists} setWordLists={setWordLists} focusedWordListId={focusedWordListId} setFocusedWordListId={setFocusedWordListId} test={test} setTest={setTest} testResult={testResult} setTestResult={setTestResult} />}></Route>
                    <Route exact path="/profile" element={<ProfileSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} userInfo={userInfo} fetchUserInfo={fetchUserInfo} />}></Route>

                    <Route exact path="/signIn" element={<ProfileSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} fetchUserInfo={fetchUserInfo} />}></Route>
                    <Route exact path="/signUp" element={<ProfileSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} fetchUserInfo={fetchUserInfo} />}></Route>
                  </>
                  :
                  <>
                    <Route exact path="/signIn" element={<SignInSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} fetchUserInfo={fetchUserInfo} wordId={word ? word.id : undefined} />}></Route>
                    <Route exact path="/signUp" element={<SignUpSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} fetchUserInfo={fetchUserInfo} />}></Route>
                    <Route exact path="/resetPassword" element={<ResetPasswordSection handleLoadingScreen={handleLoadingScreen} handleException={handleException} handleMessage={handleMessage} fetchUserInfo={fetchUserInfo} wordId={word ? word.id : undefined} />}></Route>
                    
                    <Route exact path="/list" element={<PageStatusCodeRoute code={403} handleLoadingScreen={handleLoadingScreen} handleNavbar={handleNavbar} />}></Route>
                    <Route exact path="/test" element={<PageStatusCodeRoute code={403} handleLoadingScreen={handleLoadingScreen} handleNavbar={handleNavbar} />}></Route>
                    <Route exact path="/profile" element={<PageStatusCodeRoute code={403} handleLoadingScreen={handleLoadingScreen} handleNavbar={handleNavbar} />}></Route>
                  </>
                }
                <Route path="/*" element={<PageStatusCodeRoute code={404} handleLoadingScreen={handleLoadingScreen} handleNavbar={handleNavbar} />}></Route>
              </Routes>

              {showMessage ? <Message borderColor={message.color} message={message.text} duration={message.duration} /> : ''}
            </>
          }
        </>
      }
    </ThemeProvider >
  );
}

export default App;
