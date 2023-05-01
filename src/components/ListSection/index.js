import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import {
    Main,
    ListsDiv,
    GridContainerList,
    GridItemList,
    ListPaper,
    List,
    ListTypography,
    FocusedListPaper,
    FocusedListWord,
    WordDivider,
    Btn,
    ListSwitch,
    SwitchTooltip
} from './ListElements';
import { SERVER_URL } from "../../server";

export default function ListSection(props) {

    const [ready, setReady] = useState(undefined);

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

    const getWordList = async (listId) => {
        await axios.get(SERVER_URL + "/api/getWordList/" + listId, { withCredentials: true }).then(res => {
            if (res.status === 200 && res.data) {
                props.setFocusedWordList(res.data);
            }
            else {
                props.handleException();
            }
        })
            .catch((error) => {
                props.handleException(error.response.data);
            });
    };

    const removeWordFromList = async (wordId) => {
        await axios.delete(SERVER_URL + "/api/removeWordFromList", { params: { wordId: wordId }, withCredentials: true }).then(res => {
            if (res.status === 200) {
                props.handleMessage(false);
                props.handleMessage(true, "Word removed");
                props.setFocusedWordList(res.data);
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
        await axios.put(SERVER_URL + "/api/learnWord", null, { params: { wordId: wordId, isLearned: isLearned }, withCredentials: true }).then(res => {
            if (res.status === 200 && res.data) {
                props.handleMessage(false);
                if (isLearned) {
                    props.handleMessage(true, "Word is set as learned");
                }
                else {
                    props.handleMessage(true, "Word is set as unlearned");
                }
                props.setFocusedWordList(res.data);
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

    const handleRemove = (event, wordId) => {
        event.preventDefault();
        removeWordFromList(wordId);
    }

    const handleOnClickList = (event) => {
        getWordList(event.currentTarget.id);

        if (props.focusedWordListElement) {
            props.focusedWordListElement.classList.remove("focusedList");
        }

        props.setFocusedWordListElement(event.currentTarget);
        event.currentTarget.classList.add("focusedList");
    }


    useEffect(() => {
        document.title = "Voctionary | List";
        getWordLists();
        if (props.focusedWordList) {
            getWordList(props.focusedWordList.id);
        }

        return () => {
            props.handleMessage(false);
            props.handleLoadingScreen(false);
        };
    }, []);

    useEffect(() => {
        if (props.wordLists !== undefined) {
            setReady(true);
            props.handleLoadingScreen(false);
        }
    }, [props.wordLists]);

    return (
        <>
            {ready ?
                <Main>
                    <ListsDiv>
                        <GridContainerList container>
                            {props.wordLists.map(list => (
                                list.count ?
                                    <GridItemList item xs={6} sm={4} md={3}>
                                        <ListPaper id={list.id} onClick={handleOnClickList} sx={{ width: '200px' }} className={props.focusedWordList && props.focusedWordList.id === list.id ? "focusedList" : "none"}>
                                            <List>
                                                <ListTypography variant="h2" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{list.language.title}</ListTypography>
                                                <ListTypography variant="h4" sx={{ fontSize: '0.8rem', marginTop: '5px' }}>{list.count + " words"}</ListTypography>
                                            </List>
                                        </ListPaper>
                                    </GridItemList>
                                    : ''
                            ))}
                        </GridContainerList>
                        {
                            props.focusedWordList ?
                                <FocusedListPaper sx={{ marginTop: '30px' }}>
                                    {props.focusedWordList.wordListItems.map((wordListItem, index) => (
                                        <>
                                            {index === 0 ? '' : <WordDivider/>}
                                            <FocusedListWord to={"/word/" + wordListItem.word.id} >
                                                <Grid container sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '3fr 0.75fr 1fr',
                                                    gridTemplateRows: '1fr 1fr',

                                                    '@media (min-width: 700px)': {
                                                        gridTemplateColumns: '2.5fr 1.5fr 1fr 0.75fr 0.75fr',
                                                        gridTemplateRows: '1fr',
                                                    }
                                                }}>
                                                    <Grid item sx={{ marginLeft: '5px', alignSelf: 'center', '@media (min-width: 700px)': { order: 1 } }}>
                                                        <ListTypography variant="h5">
                                                            {wordListItem.word.headwords.map((h, i) => (i === 0 ? h.text : ", " + h.text))}
                                                        </ListTypography>
                                                    </Grid>
                                                    <Grid item sx={{ alignSelf: 'center', textAlign: 'center', '@media (min-width: 700px)': { order: 4 } }}>
                                                        <SwitchTooltip id='switchtip' title={wordListItem.isLearned ? 'learned' : 'not learned'} placement="top" leaveDelay={0}>
                                                            <ListSwitch onClick={(event) => handleSwitch(event, wordListItem.word.id)} checked={wordListItem.isLearned}/>
                                                        </SwitchTooltip>
                                                    </Grid>
                                                    <Grid item sx={{ alignSelf: 'center', textAlign: 'center', '@media (min-width: 700px)': { order: 3, textAlign: 'start' } }}>
                                                        <ListTypography variant="subtitle">
                                                            {
                                                                wordListItem.createdAt.slice(8, 10) + "." +
                                                                wordListItem.createdAt.slice(5, 7) + "." +
                                                                wordListItem.createdAt.slice(0, 4)
                                                            }
                                                        </ListTypography>
                                                    </Grid>
                                                    <Grid item sx={{ marginLeft: '5px', alignSelf: 'center', textAlign: 'start', '@media (min-width: 700px)': { order: 2, textAlign: 'center' } }}>
                                                        <ListTypography variant="h6">
                                                            {wordListItem.word.partOfSpeech}
                                                        </ListTypography>
                                                    </Grid>
                                                    <Grid item sx={{ alignSelf: 'center', textAlign: 'center', '@media (min-width: 700px)': { order: 5 } }}>
                                                        <Btn onClick={(event) => handleRemove(event, wordListItem.word.id)}>Remove</Btn>
                                                    </Grid>
                                                </Grid>
                                            </FocusedListWord>
                                        </>
                                    ))}
                                </FocusedListPaper> : ''
                        }
                    </ListsDiv>
                </Main>
                : ''
            }
        </>
    );
}