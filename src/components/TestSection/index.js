import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactCardFlip from "react-card-flip";

import {
    Main,
    TestDiv,
    GridContainerTest,
    GridItemTest,
    TestPaper,
    TestOption,
    BtnDiv,
    Btn,
    TestTypography
} from './TestElements';

import {
    GridContainerList,
    GridItemList,
    ListPaper,
    List,
    SwitchTooltip,
    ListSwitch
} from '../ListSection/ListElements';
import FormControlLabel from '@mui/material/FormControlLabel';

import { SERVER_URL } from "../../server";

export default function TestSection(props) {
    const navigate = useNavigate();

    const [ready, setReady] = useState(undefined);

    const handleClick = (event) => {
        if (event.target.id === props.test.optionKeys[0]) {
            navigate("/word/" + props.test.optionKeys[0])
        }
        else if (event.target.id !== "switch") {
            props.setTest(prevTest => ({ ...prevTest, isFlipped: !props.test.isFlipped }));
        }
    };

    const getWordLists = async () => {
        await axios.get(SERVER_URL + "/api/getWordLists", { withCredentials: true }).then(res => {
            if (res.status === 200 && res.data) {
                props.setWordLists(res.data);
            }
            else {
                props.handleException();
            }
        })
            .catch((error) => {
                props.handleException(error.response.data);
            });
    };

    const startTest = async (listId, testType) => {
        await axios.get(SERVER_URL + "/api/startTest", { params: { listId: listId, testType: testType }, withCredentials: true }).then(res => {
            if (res.status === 200 && res.data) {
                console.log(res.data);
                var keys = Object.keys(res.data.responses);
                var values = keys.map(function (v) { return res.data.responses[v]; });
                if (testType === "FLASH_CARD") {
                    props.setTest({ testType: testType, testId: res.data.testId, question: res.data.question, partOfSpeech: res.data.partOfSpeech, options: res.data.responses, optionKeys: keys, optionValues: values, isLearned: false, isFlipped: false });
                }
                else {
                    props.setTest({ testType: testType, testId: res.data.testId, question: res.data.question, partOfSpeech: res.data.partOfSpeech, options: res.data.responses, optionKeys: keys, optionValues: values });
                }
            }
            else {
                props.handleException();
            }
        })
            .catch((error) => {
                props.handleException(error.response.data);
            });
    };

    const finishTest = async (testId, response) => {
        await axios.get(SERVER_URL + "/api/finishTest", { params: { testId: testId, response: response }, withCredentials: true }).then(res => {
            if (res.status === 200 && res.data) {
                var keys = Object.keys(res.data.words);
                var values = keys.map(function (v) { return res.data.words[v]; });

                var cssClasses = [];

                for (let i = 0; i < props.test.optionKeys.length; i++) {
                    var classes = [];
                    if (props.test.optionKeys[i] === keys[0]) {
                        classes.push("correctOption");
                    }
                    else {
                        classes.push("wrongOption");
                    }

                    if (props.test.optionKeys[i] === response) {
                        classes.push("chosenOption");
                    }

                    cssClasses.push(classes);
                }

                props.setTestResult({ testId: res.data.testId, success: res.data.success, keys: keys, values: values, classes: cssClasses });
            }
            else {
                props.handleException();
            }
        })
            .catch((error) => {
                props.handleException(error.response.data);
            });
    };

    const learnWord = async (wordId, isLearned) => {
        console.log(wordId, isLearned);
        await axios.put(SERVER_URL + "/api/learnWord", null, { params: { wordId: wordId, isLearned: isLearned }, withCredentials: true }).then(res => {
            if (res.status === 200 && res.data) {
                props.handleMessage(false);
                if (isLearned) {
                    props.handleMessage(true, "Word is set as learned");
                }
                else {
                    props.handleMessage(true, "Word is set as unlearned");
                }
                props.setTest(prevTest => ({ ...prevTest, isLearned: isLearned }));
            }
            else {
                props.handleException();
            }
        })
            .catch((error) => {
                props.handleException(error.response.data);
            });
    };

    const handleSwitch = (event, wordId) => {
        event.preventDefault();
        learnWord(wordId, event.target.checked);
    }


    const handleOnClickListOne = (event) => {
        props.setFocusedWordListId(event.currentTarget.id);
    }

    const handleOnClickListTwo = (event) => {
        const testType = event.currentTarget.id;
        startTest(props.focusedWordListId, testType);
        props.setTest(prevTest => ({ ...prevTest, testType: testType }));
    }

    const handleOnClickListThree = async (event) => {
        var senseId = event.currentTarget.id;
        if (props.testResult !== undefined) {
            for (let i = 0; i < props.testResult.keys.length; i++) {
                if (props.testResult.keys[i] === senseId) {
                    navigate("/word/" + props.testResult.values[i]);
                }
            }
        }
        else {
            finishTest(props.test.testId, senseId);
        }
    }

    const handleOnClickListFour = async (event) => {
        props.setTestResult(undefined);
        startTest(props.focusedWordListId, props.test.testType);
    }

    const handleNextCard = async (event) => {
        props.setTest(prevTest => ({ ...prevTest, isFlipped: false }));
        startTest(props.focusedWordListId, props.test.testType);
    }

    const handleOnClickListBack = async (event) => {
        props.setTest({ testType: undefined, testId: undefined, question: undefined, partOfSpeech: undefined, options: [], optionKeys: [], optionValues: [] });
        props.setTestResult(undefined);
    }

    useEffect(() => {
        document.title = "Voctionary | Test";
        getWordLists();

        return () => {
            props.handleMessage(false);
            props.handleLoadingScreen(true);
        };
    }, []);

    useEffect(() => {
        if (props.wordLists !== undefined) {
            setReady(true);
            props.handleLoadingScreen(false);
        }
    }, [props.wordLists]);

    useEffect(() => {
        console.log(props.test);
    }, [props.test]);

    return (
        <>
            {ready ?
                <Main>
                    {!props.test.optionKeys.length ?
                        <TestDiv>
                            <GridContainerList container>
                                {props.wordLists.map(list => (
                                    list.count ?
                                        <GridItemList item xs={6} sm={4} md={3}>
                                            <ListPaper id={list.id} className={list.id == props.focusedWordListId ? 'focusedList' : ''} onClick={handleOnClickListOne} sx={{ width: '200px' }}>
                                                <List>
                                                    <TestTypography variant="h2" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{list.language.title}</TestTypography>
                                                    <TestTypography variant="h4" sx={{ fontSize: '0.8rem', marginTop: '5px' }}>{list.count + " words"}</TestTypography>
                                                </List>
                                            </ListPaper>
                                        </GridItemList>
                                        : ''
                                ))
                                }
                            </GridContainerList>
                            {props.focusedWordListId ?
                                <GridContainerList container sx={{ marginTop: '30px', justifyContent: 'center' }}>
                                    <GridItemList item xs={12} sm={6} md={4}>
                                        <ListPaper id="HEADWORD" onClick={handleOnClickListTwo} sx={{ minWidth: '200px', maxWidth: '300px' }}>
                                            <List>
                                                <TestTypography variant="h2" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Headword Test</TestTypography>
                                                <TestTypography variant="h4" sx={{ fontSize: '0.8rem', marginTop: '5px' }}>Guess the headword with a hint of sense</TestTypography>
                                            </List>
                                        </ListPaper>
                                    </GridItemList>
                                    <GridItemList item xs={12} sm={6} md={4}>
                                        <ListPaper id="SENSE" onClick={handleOnClickListTwo} sx={{ minWidth: '200px', maxWidth: '300px' }}>
                                            <List>
                                                <TestTypography variant="h2" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Sense Test</TestTypography>
                                                <TestTypography variant="h4" sx={{ fontSize: '0.8rem', marginTop: '5px' }}>Guess the sense with a hint of headword</TestTypography>
                                            </List>
                                        </ListPaper>
                                    </GridItemList>
                                    <GridItemList item xs={12} sm={6} md={4}>
                                        <ListPaper id="FLASH_CARD" onClick={handleOnClickListTwo} sx={{ minWidth: '200px', maxWidth: '300px' }}>
                                            <List>
                                                <TestTypography variant="h2" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Flash cards</TestTypography>
                                                <TestTypography variant="h4" sx={{ fontSize: '0.8rem', marginTop: '5px' }}>Read the sense and remember the word</TestTypography>
                                            </List>
                                        </ListPaper>
                                    </GridItemList>
                                </GridContainerList> : ''
                            }
                        </TestDiv>
                        :
                        <TestDiv>
                            <GridContainerTest container>
                                {props.test.testType === "HEADWORD" ?
                                    <>
                                        <TestPaper sx={{ marginBottom: '20px' }}>
                                            <GridItemTest item xs={12}>
                                                <TestTypography variant="h3" sx={{ fontSize: '1.2rem' }}>{props.test.partOfSpeech}</TestTypography>
                                            </GridItemTest>
                                            <GridItemTest item xs={12}>
                                                <TestTypography variant="h2" sx={{ fontSize: '1.5rem', marginTop: '5px' }}>{props.test.question}</TestTypography>
                                            </GridItemTest>
                                        </TestPaper>
                                        {
                                            [0, 1, 2].map(index =>
                                                <GridItemTest item xs={12}>
                                                    <TestOption id={props.test.optionKeys[index]} className={props.testResult ? props.testResult.classes[index].map(c => c + " ") : "activedOption"} onClick={handleOnClickListThree}>
                                                        <TestTypography variant="h5" sx={{ width: '200px' }}>{props.test.optionValues[index]}</TestTypography>
                                                    </TestOption>
                                                </GridItemTest>)
                                        }
                                        {props.testResult ?
                                            <>
                                                <GridItemTest item xs={12} sx={{ marginTop: '20px' }}>
                                                    {props.testResult.success ?
                                                        <TestTypography variant="h5" sx={{ width: '200px', color: '#01bf71' }}>Correct</TestTypography>
                                                        :
                                                        <TestTypography variant="h5" sx={{ width: '200px', color: 'red' }}>Wrong</TestTypography>
                                                    }
                                                </GridItemTest>
                                                <BtnDiv>
                                                    <GridItemTest item xs={6} sx={{ marginRight: '5vw', justifyContent: 'right' }}>
                                                        <Btn onClick={handleOnClickListBack}>Back</Btn>
                                                    </GridItemTest>
                                                    <GridItemTest item xs={6} sx={{ marginLeft: '5vw', justifyContent: 'left' }}>
                                                        <Btn onClick={handleOnClickListFour}>Next question</Btn>
                                                    </GridItemTest>
                                                </BtnDiv>
                                            </>
                                            :
                                            <BtnDiv>
                                                <GridItemTest item xs={12}>
                                                    <Btn onClick={handleOnClickListBack}>Back</Btn>
                                                </GridItemTest>
                                            </BtnDiv>
                                        }
                                    </> : ''
                                }
                                {props.test.testType === "SENSE" ?
                                    <>
                                        <TestPaper sx={{ marginBottom: '20px' }}>
                                            <GridItemTest item xs={12}>
                                                <TestTypography variant="h3" sx={{ fontSize: '1.2rem' }}>{props.test.partOfSpeech}</TestTypography>
                                            </GridItemTest>
                                            <GridItemTest item xs={12}>
                                                <TestTypography variant="h2" sx={{ fontSize: '1.5rem', marginTop: '5px' }}>{props.test.question}</TestTypography>
                                            </GridItemTest>
                                        </TestPaper>
                                        {
                                            [0, 1, 2].map(index =>
                                                <GridItemTest item xs={12} >
                                                    <TestOption id={props.test.optionKeys[index]} sx={{ padding: '10px' }} className={props.testResult ? props.testResult.classes[index].map(c => c + " ") : "activedOption"} onClick={handleOnClickListThree}>
                                                        <TestTypography variant="h6" sx={{ width: '400px' }}>{props.test.optionValues[index]}</TestTypography>
                                                    </TestOption>
                                                </GridItemTest>)
                                        }
                                        {props.testResult ?
                                            <>
                                                <GridItemTest item xs={12} sx={{ marginTop: '20px' }}>
                                                    {props.testResult.success ?
                                                        <TestTypography variant="h5" sx={{ width: '200px', color: '#01bf71' }}>Correct</TestTypography>
                                                        :
                                                        <TestTypography variant="h5" sx={{ width: '200px', color: 'red' }}>Wrong</TestTypography>
                                                    }
                                                </GridItemTest>
                                                <BtnDiv>
                                                    <GridItemTest item xs={6} sx={{ marginRight: '5vw', justifyContent: 'right' }}>
                                                        <Btn onClick={handleOnClickListBack}>Back</Btn>
                                                    </GridItemTest>
                                                    <GridItemTest item xs={6} sx={{ marginLeft: '5vw', justifyContent: 'left' }}>
                                                        <Btn onClick={handleOnClickListFour}>Next question</Btn>
                                                    </GridItemTest>
                                                </BtnDiv>
                                            </>
                                            :
                                            <BtnDiv>
                                                <GridItemTest item xs={12}>
                                                    <Btn onClick={handleOnClickListBack}>Back</Btn>
                                                </GridItemTest>
                                            </BtnDiv>
                                        }
                                    </> : ''
                                }
                                {props.test.testType === "FLASH_CARD" ?
                                    <>
                                        <ReactCardFlip isFlipped={props.test.isFlipped} flipDirection="horizontal" sx={{ justifyContent: 'center' }}>
                                            <TestPaper onClick={handleClick} sx={{ width: '400px', height: '400px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                <div>
                                                    <GridItemTest item xs={12}>
                                                        <TestTypography variant="h3" sx={{ fontSize: '1.5rem' }}>{props.test.partOfSpeech}</TestTypography>
                                                    </GridItemTest>
                                                    <GridItemTest item xs={12} sx={{ marginTop: '20px' }}>
                                                        <TestTypography variant="h2" sx={{ fontSize: '1.8rem', marginTop: '5px' }}>{props.test.question}</TestTypography>
                                                    </GridItemTest>
                                                </div>
                                            </TestPaper>
                                            <TestPaper onClick={(event) => handleClick(event)} sx={{ width: '400px', height: '400px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                <div>
                                                    <GridItemTest item xs={12}>
                                                        <SwitchTooltip title="open word" placement="top" leaveDelay={0}>
                                                            <TestTypography id={props.test.optionKeys[0]} variant="h4" sx={{}}>{props.test.optionValues[0]}</TestTypography>
                                                        </SwitchTooltip>
                                                    </GridItemTest>
                                                    <GridItemTest item xs={12} sx={{ marginTop: '20px' }}>
                                                        <FormControlLabel
                                                            control={<ListSwitch id="switch" onClick={(event) => handleSwitch(event, props.test.optionKeys[0])} checked={props.test.isLearned} />}
                                                            label={props.test.isLearned ? "Learned" : "Not Learned"}
                                                            labelPlacement="bottom"
                                                        />
                                                    </GridItemTest>
                                                </div>
                                            </TestPaper>
                                        </ReactCardFlip>

                                        <BtnDiv>
                                            <GridItemTest item xs={6} sx={{ marginRight: '40px', justifyContent: 'right' }}>
                                                <Btn onClick={handleOnClickListBack}>Back</Btn>
                                            </GridItemTest>
                                            <GridItemTest item xs={6} sx={{ marginLeft: '40px', justifyContent: 'left' }}>
                                                <Btn onClick={handleNextCard}>Next card</Btn>
                                            </GridItemTest>
                                        </BtnDiv>
                                    </> : ''
                                }
                            </GridContainerTest>
                        </TestDiv>
                    }
                </Main> : ''
            }
        </>
    );
}

