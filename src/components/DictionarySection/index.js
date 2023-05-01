import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    InputAdornment,
    Typography
} from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import axios from 'axios';
import { SERVER_URL } from "../../server";


import {
    SearchStack,
    SearchForm,
    SearchFormStack,
    LanguageWrapper,
    Language,
    LanguageLabel,
    LanguageSelect,
    LanguageSelectItem,
    WordWrapper,
    Word,
    Autocomplete,
    AutocompleteItem,
    AutocompleteTypography,
    FocusedWordWrapper,
    GridContainer,
    GridItem,
    GridMainPaper,
    GridSensePaper,
    WrapperIconText,
    SenseTypography,
    SenseTranslatedTypography,
    FlagUK,
    ExampleTypography,
    ExampleTranslatedTypography,
    Btn,
    BtnLink
} from './DictionarySectionElements';

export default function DictionarySection(props) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ready, setReady] = useState(false);
    const [autocomplete, setAutocomplete] = useState(true);
    const [isWordFetched, setIsWordFetched] = useState(undefined);

    //api requests
    const fetchRandomWord = async (lang = props.languageFrom) => {
        if (lang) {
            await axios.get(SERVER_URL + "/api/randomWord", { withCredentials: true, params: { language: lang.key } }).then(res => {
                if (res.data) {
                    props.setWord({ ...res.data, isPhrase: wordContainsPhrase(res.data) });
                    navigate("/word/" + res.data.id);
                }
                else {
                    props.handleException();
                }
            })
                .catch((error) => {
                    props.handleException(error.response.data);
                });
        }
    };

    const findWord = async (text, language = props.languageFrom) => {
        props.setWord(undefined);
        navigate("/");
        text = text.trim();
        if (text && language) {
            axios.get(SERVER_URL + "/api/findWord", { params: { language: language.key, word: text }, withCredentials: true }).then(res => {
                if (res.data.length === 0) {
                    props.setWords(undefined);
                }
                else {
                    props.setWords(res.data);
                    setAutocomplete(true);
                }
            })
                .catch((error) => {
                    props.handleException(error.response.data);
                });
        }
        else {
            props.setWords(undefined);
        }
    };

    const getWordById = (wordId) => {
        axios.get(SERVER_URL + "/api/word/" + wordId, { withCredentials: true }).then(res => {
            if (res.data) {
                props.setWord({ ...res.data, isPhrase: wordContainsPhrase(res.data) });
                navigate("/word/" + res.data.id);
                props.setLanguageFrom(res.data.language);
                setIsWordFetched(true);
            }
            else {
                props.handleException();
                setIsWordFetched(false);
            }
        })
            .catch((error) => {
                props.handleException(error.response.data);
                setIsWordFetched(false);
            });
        setAutocomplete(false);
    }


    const addWordToList = async (wordId) => {
        await axios.post(SERVER_URL + "/api/addWordToList", new URLSearchParams({ wordId: wordId }), { withCredentials: true }).then(res => {
            props.handleMessage(false);
            props.handleMessage(true, "Word added");
            props.setWord(prevWord => ({ ...prevWord, isListed: true }));
        })
            .catch((error) => {
                props.handleException(error.response.data);
            });
    };

    const removeWordFromList = async (wordId, listId) => {
        await axios.delete(SERVER_URL + "/api/removeWordFromList", { params: { wordId: wordId }, withCredentials: true }).then(res => {
            props.handleMessage(true, "Word removed");
            props.setWord(prevWord => ({ ...prevWord, isListed: false }));
        })
            .catch((error) => {
                props.handleException(error.response.data);
            });
    };

    const wordContainsPhrase = (word) => {
        var contains = false;
        if (word && word.senses) {
            for (const sense of word.senses) {
                if (!sense.definition && sense.phrases && sense.phrases.length) {
                    for (const phrase of sense.phrases) {
                        if (phrase.text && phrase.definition) {
                            contains = true;
                            return;
                        }
                    }
                }
            }
        }
        return contains;
    };


    //handlers
    const handleOnChangeLanguageFrom = (event) => {
        props.handleLoadingScreen(true);
        props.setLanguageFrom(event.target.value);
        if (!props.text) {
            fetchRandomWord(event.target.value);
        }
        else {
            props.setWord(undefined);
            findWord(props.text, event.target.value);
        }
        props.handleLoadingScreen(false);
    };

    const handleOnChangeLanguageTo = (event) => {
        props.setLanguageTo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    const handleSearchFocus = () => {
        setAutocomplete(true);
    }

    const handleSearchBlur = () => {
        setAutocomplete(false);
    }

    const handleAdd = (event) => {
        addWordToList(props.word.id);
    }

    const handleRemove = (event) => {
        removeWordFromList(props.word.id);
    }

    const handleOnChangeText = (event) => {
        props.setText(event.target.value);
    };


    //useEffect 
    useEffect(() => {
        document.title = "Voctionary | Dictionary";

        return () => {
            props.handleMessage(false);
            props.handleLoadingScreen(true);
        };
    }, []);

    useEffect(() => {
        if (id && isWordFetched === undefined) {
            getWordById(id);
        }
        else if(!id && isWordFetched === undefined){
            fetchRandomWord();
        }
    }, [id, isWordFetched]);

    useEffect(() => {
        if (isWordFetched === false) {
            fetchRandomWord();
            setIsWordFetched(true);
        }
    }, [isWordFetched]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if(isWordFetched === undefined){
            }
            else if (!props.text && !props.word ) {
                fetchRandomWord();
            }
            else if (props.text) {
                findWord(props.text);
            }
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [props.text]);

    useEffect(() => {
        if (props.text || (!props.text && props.word)) {
            props.handleLoadingScreen(false);
            setReady(true);
        }
    }, [props.text, props.word]);

    return (
        <>
            {!ready ? '' :
                <>
                    <SearchStack spacing={0} >
                        <SearchForm onSubmit={handleSubmit}>
                            <SearchFormStack spacing={0}>
                                <LanguageWrapper>
                                    <Language sx={{ margin: '10px' }}>
                                        <LanguageLabel id="language-from-label">Language From</LanguageLabel>
                                        <LanguageSelect labelId="language-from-label" id="language-from" value={props.languageFrom} label="Language From" onChange={handleOnChangeLanguageFrom} renderValue={(value) => `${value.title}`} defaultValue='' sx={{ fontFamily: 'inherit' }}>
                                            {props.languagesFrom.map(language => (
                                                <LanguageSelectItem key={language.id} value={language}>{language.title}</LanguageSelectItem>
                                            ))}
                                        </LanguageSelect>
                                    </Language>
                                    {
                                        props.languagesTo.length < 1 ? ''
                                            :
                                            <Language >
                                                <LanguageLabel id="language-from-to">Language To</LanguageLabel>
                                                <LanguageSelect labelId="language-from-to" id="language-to" value={props.languageTo} label="Language To" onChange={handleOnChangeLanguageTo} renderValue={(value) => `${value.title}`} defaultValue=''>
                                                    {props.languagesTo.map(language => (
                                                        <LanguageSelectItem key={language.id} value={language}>{language.title}</LanguageSelectItem>
                                                    ))}
                                                </LanguageSelect>
                                            </Language>
                                    }
                                </LanguageWrapper>
                                <WordWrapper>
                                    <Word sx={{ minWidth: '410px' }} id="outlined-textarea" label="Search" placeholder="Start typing to look up a word" value={props.text} onChange={handleOnChangeText} onKeyDown={handleKeyDown} onBlur={handleSearchBlur} onFocus={handleSearchFocus}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ fontSize: '1.8rem' }} />
                                                </InputAdornment>
                                            ), style: { fontSize: '1.4rem' }
                                        }} InputLabelProps={{ style: { fontSize: '1.4rem' } }} />
                                </WordWrapper>
                            </SearchFormStack>
                        </SearchForm>
                    </SearchStack>

                    {autocomplete === false || props.words === undefined ? '' :
                        <Autocomplete>
                            {props.words.map(w => (
                                <AutocompleteItem key={w.id} onMouseDown={() => getWordById(w.id)}>
                                    <AutocompleteTypography sx={{ display: 'inline', fontWeight: 'bold', fontSize: '1.2rem', marginRight: '10px' }} component="h2" variant="body2">{w.headwords === undefined ? '' : w.headwords.map((h, i) => (i === 0 ? h.text : ', ' + h.text))}</AutocompleteTypography>
                                    <AutocompleteTypography sx={{ display: 'inline', fontStyle: 'italic', fontSize: '1.1rem', marginLeft: '6px' }} component="h3" variant="body2">{w.headwords === undefined ? '' : w.partOfSpeech}</AutocompleteTypography>
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    }

                    {props.word === undefined ? '' :
                        <FocusedWordWrapper>
                            <GridMainPaper>
                                <GridContainer container>
                                    <GridItem item xs={12}>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Typography variant="h3" sx={{ display: 'inline' }}>
                                                {props.word.headwords.map((h, i) => (i === 0 ? h.text : ", " + h.text))}
                                            </Typography>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', marginTop: '10px' }}>
                                                {props.isAuthorized ?
                                                    <>
                                                        {props.word.isListed ?
                                                            <Btn onClick={handleRemove}>Remove From List</Btn>
                                                            :
                                                            <Btn onClick={handleAdd}>Add To List</Btn>
                                                        }
                                                    </>
                                                    :
                                                    <BtnLink to='/signIn'>Add To List</BtnLink>
                                                }
                                            </div>
                                        </div>
                                    </GridItem>
                                    <GridItem item xs={12}>
                                        <WrapperIconText>
                                            <VolumeUpIcon style={{ marginRight: '7px' }} />
                                            <Typography variant="h5">
                                                {props.word.headwords.map((h, hi) => h.pronunciations.map((p, pi) => (hi === 0 && pi === 0) ? p : " / " + p))}
                                            </Typography>
                                        </WrapperIconText>
                                    </GridItem>
                                    <GridItem item xs={12}>
                                        <WrapperIconText>
                                            <AutoAwesomeMotionIcon style={{ marginRight: '7px' }} />
                                            <Typography variant="h5">
                                                {props.word.partOfSpeech ? props.word.partOfSpeech : ''}
                                            </Typography>
                                        </WrapperIconText>
                                    </GridItem>
                                    <GridItem item xs={12}>
                                        <Typography style={{ marginTop: '20px', fontWeight: 'bold' }} variant="h6">DEFINITIONS:</Typography>
                                        {props.word.senses.filter(sense => sense.definition).map((s) => (
                                            s.definition ?
                                                <GridSensePaper key={s.id}>
                                                    <SenseTypography variant='body1' sx={{ fontWeight: '900', fontSize: '17px', marginBottom: '5px' }}>{s.definition}</SenseTypography>
                                                    {
                                                        s.englishTranslationDefinition ?
                                                            <>
                                                                <div style={{ margin: '5px 0 0 15px', display: 'flex', flexDirection: 'row' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '4px' }}>
                                                                        <FlagUK style={{ marginRight: '5px' }} />
                                                                    </div>
                                                                    <div style={{ display: 'grid' }}>
                                                                        <SenseTranslatedTypography variant="body1" sx={{ fontSize: '16px' }}>
                                                                            {s.englishTranslationDefinition ? s.englishTranslationDefinition : ''}
                                                                        </SenseTranslatedTypography>
                                                                        {
                                                                            s.englishTranslationWords ?
                                                                                <SenseTranslatedTypography variant="body1" sx={{ fontSize: '16px', fontWeight: '900' }}>
                                                                                    {
                                                                                        s.englishTranslationWords.map((ew, ewi) => ewi === 0 ? ew : ", " + ew)
                                                                                    }
                                                                                </SenseTranslatedTypography> : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </> : ''
                                                    }
                                                    {
                                                        s.examples && s.examples.length ?
                                                            <>
                                                                <Typography style={{ margin: '10px 0 0 15px', fontWeight: '900' }} variant="subtitle1">EXAMPLES:</Typography>
                                                                {s.examples.map((e, i) => (
                                                                    <>
                                                                        <ExampleTypography variant="body1" sx={{ marginLeft: '30px' }}>{"● " + e.text}</ExampleTypography>
                                                                        {
                                                                            e.englishTranslation ?
                                                                                <div style={{ margin: '0 0 5px 30px', display: 'flex', flexDirection: 'row' }}>
                                                                                    <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '5px', marginLeft: '20px' }}>
                                                                                        <FlagUK style={{ marginRight: '5px' }} />
                                                                                    </div>
                                                                                    <div style={{ display: 'flex' }}>
                                                                                        <ExampleTranslatedTypography variant="body1" >{e.englishTranslation}</ExampleTranslatedTypography>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                ''
                                                                        }
                                                                    </>
                                                                ))}
                                                            </> : ''
                                                    }
                                                    {
                                                        s.phrases && s.phrases.length ?
                                                            <>
                                                                <Typography style={{ margin: '10px 0 -7px 15px', fontWeight: '900' }} variant="subtitle1">PHRASES:</Typography>
                                                                {s.phrases.map((p, pi) => (
                                                                    <>
                                                                        {
                                                                            p.text ?
                                                                                <>
                                                                                    <ExampleTypography variant="body1" sx={{ margin: '0 0 0 30px' }}>{"● " + p.text}</ExampleTypography>
                                                                                    {
                                                                                        p.englishTranslationText ?
                                                                                            <div style={{ margin: '0 0 5px 30px', display: 'flex', flexDirection: 'row' }}>
                                                                                                <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '5px', marginLeft: '20px' }}>
                                                                                                    <FlagUK style={{ marginRight: '5px' }} />
                                                                                                </div>
                                                                                                <div style={{ display: 'grid' }}>
                                                                                                    <SenseTranslatedTypography variant="body1">{p.englishTranslationText}</SenseTranslatedTypography>
                                                                                                </div>
                                                                                            </div> : ''
                                                                                    }
                                                                                    {
                                                                                        p.definition && p.englishTranslationDefinition ?
                                                                                            <>
                                                                                                <ExampleTypography variant="body1" sx={{ display: 'inline', margin: '0 0 0 30px', fontWeight: '900' }}>Meaning:</ExampleTypography>
                                                                                                <ExampleTypography variant="body1" sx={{ display: 'inline', margin: '0 0 0 3px' }}>{p.definition}</ExampleTypography>
                                                                                                <div style={{ margin: '0 0 5px 30px', display: 'flex', flexDirection: 'row' }}>
                                                                                                    <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '5px', marginLeft: '20px' }}>
                                                                                                        <FlagUK style={{ marginRight: '5px' }} />
                                                                                                    </div>
                                                                                                    <div style={{ display: 'flex' }}>
                                                                                                        <ExampleTranslatedTypography variant="body1" >{p.englishTranslationDefinition}</ExampleTranslatedTypography>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </> : ''
                                                                                    }
                                                                                </> : ''
                                                                        }
                                                                        {
                                                                            p.examples.length ?
                                                                                <>
                                                                                    <Typography style={{ margin: '0 0 0 30px', fontWeight: '900' }} variant="subtitle2">EXAMPLES:</Typography>
                                                                                    {
                                                                                        p.examples.map((e, ei) => (
                                                                                            <>
                                                                                                <ExampleTypography variant="body2" sx={{ marginLeft: '45px' }}>{ei + 1 + ". " + e.text}</ExampleTypography>
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </>
                                                                                : ''
                                                                        }
                                                                    </>
                                                                ))}
                                                            </> : ''
                                                    }
                                                </GridSensePaper>
                                                : '')
                                        )}
                                    </GridItem>
                                    {props.word.isPhrase ?
                                        <GridItem item xs={12}>
                                            <Typography style={{ marginTop: '20px', fontWeight: 'bold' }} variant="h6">PHRASES:</Typography>
                                            {props.word.senses.filter(sense => !sense.definition).map((s, i) => (
                                                s.phrases && s.phrases.length ?
                                                    <>
                                                        {s.phrases.map((p, pi) => (
                                                            p.text && p.definition ?
                                                                <GridSensePaper key={p.id}>
                                                                    <SenseTypography variant='body1' sx={{ fontWeight: '900', fontSize: '17px', marginBottom: '5px' }}>{i + 1 + ". " + p.text}</SenseTypography>
                                                                    <Typography style={{ margin: '10px 0 0 15px', fontWeight: '900' }} variant="subtitle1">DEFINITION:</Typography>
                                                                    <ExampleTypography variant="body1" sx={{ marginLeft: '30px' }}>{p.definition}</ExampleTypography>
                                                                    {
                                                                        p.examples && p.examples.length ?
                                                                            <>
                                                                                <Typography style={{ margin: '10px 0 0 15px', fontWeight: '900' }} variant="subtitle1">EXAMPLES:</Typography>
                                                                                {p.examples.map((e, ei) => (
                                                                                    <>
                                                                                        <ExampleTypography variant="body1" sx={{ marginLeft: '30px' }}>{ei + 1 + ". " + e.text}</ExampleTypography>
                                                                                        {
                                                                                            e.englishTranslation ?
                                                                                                <div style={{ margin: '0 0 5px 30px', display: 'flex', flexDirection: 'row' }}>
                                                                                                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                                                                                                        <FlagUK style={{ marginRight: '5px' }} />
                                                                                                    </div>
                                                                                                    <div style={{ display: 'flex' }}>
                                                                                                        <ExampleTranslatedTypography variant="body1" >{e.englishTranslation}</ExampleTranslatedTypography>
                                                                                                    </div>
                                                                                                </div>
                                                                                                :
                                                                                                ''
                                                                                        }

                                                                                    </>
                                                                                ))}
                                                                            </>
                                                                            :
                                                                            ''
                                                                    }
                                                                </GridSensePaper>
                                                                : ''
                                                        ))}
                                                    </>
                                                    : ''
                                            ))}
                                        </GridItem>
                                        : ''
                                    }
                                </GridContainer>
                            </GridMainPaper>
                            <div style={{ minHeight: '20px' }}></div>
                        </FocusedWordWrapper>
                    }
                </>
            }
        </>
    );
}
