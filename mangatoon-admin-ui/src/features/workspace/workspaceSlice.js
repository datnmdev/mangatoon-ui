import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api";

const initialState = {
    tabs: [],
    selectedTab: null
}

export const workspaceAsyncThunks = {
    genre: {
        getGenres: createAsyncThunk('workspace/getGenres', async () => {
            const response = await api.genre.getGenres()
            return response.data
        }),
        deleteGenre: createAsyncThunk('workspace/deleteGenre', async (id) => {
            const response = await api.genre.deleteGenre(id)
            return response.data
        }),
        createGenre: createAsyncThunk('workspace/createGenre', async (data) => {
            const response = await api.genre.createGenre(data)
            return response.data
        }),
        updateGenre: createAsyncThunk('workspace/updateGenre', async (data) => {
            const response = await api.genre.updateGenre(data)
            return response.data
        }),
        getGenreById: createAsyncThunk('workspace/getGenreById', async (id) => {
            const response = await api.genre.getGenres({
                id
            })
            return response.data
        })
    },
    author: {
        getAuthors: createAsyncThunk('workspace/getAuthors', async () => {
            const response = await api.author.getAuthors()
            return response.data
        }),
        deleteAuthor: createAsyncThunk('workspace/deleteAuthor', async (id) => {
            const response = await api.author.deleteAuthor(id)
            return response.data
        }),
        createAuthor: createAsyncThunk('workspace/createAuthor', async (data) => {
            const response = await api.author.createAuthor(data)
            return response.data
        }),
        updateAuthor: createAsyncThunk('workspace/updateAuthor', async (data) => {
            const response = await api.author.updateAuthor(data)
            return response.data
        }),
        getAuthorById: createAsyncThunk('workspace/getAuthorById', async (id) => {
            const response = await api.author.getAuthors({
                id
            })
            return response.data
        }),
        searchAuthor: createAsyncThunk('workspace/searchAuthor', async (keyword) => {
            const response = await api.author.searchAuthor(keyword)
            return response.data
        })
    },
    story: {
        getStories: createAsyncThunk('workspace/getStories', async (queries) => {
            const response = await api.story.getStories(queries)
            return response.data
        }),
        updateStory: createAsyncThunk('workspace/updateStory', async (data) => {
            const response = await api.story.updateStory(data)
            return response.data
        }),
        createStory: createAsyncThunk('workspace/createStory', async (data) => {
            const response = await api.story.createStory(data)
            return response.data
        })
    },
    country: {
        getCountries: createAsyncThunk('workspace/getCountries', async (queries) => {
            const response = await api.country.getCountries(queries)
            return response.data
        })
    },
    alias: {
        getAliases: createAsyncThunk('workspace/getAliases', async (queries) => {
            const response = await api.alias.getAliases(queries)
            return response.data
        }),
        createAlias: createAsyncThunk('workspace/createAlias', async (data) => {
            const response = await api.alias.createAlias(data)
            return response.data
        }),
        deleteAlias: createAsyncThunk('workspace/deleteAlias', async (id) => {
            const response = await api.alias.deleteAlias(id)
            return response.data
        })
    },
    storyAuthor: {
        getStoryAuthors: createAsyncThunk('workspace/getStoryAuthors', async (queries) => {
            const response = await api.storyAuthor.getStoryAuthors(queries)
            return response.data
        }),
        createStoryAuthor: createAsyncThunk('workspace/createStoryAuthor', async (data) => {
            const response = await api.storyAuthor.createStoryAuthor(data)
            return response.data
        }),
        deleteStoryAuthor: createAsyncThunk('workspace/deleteStoryAuthor', async (data) => {
            const response = await api.storyAuthor.deleteStoryAuthor(data)
            return response.data
        }),
        searchAuthor: createAsyncThunk('workspace/searchAuthorToAddStoryAuthor', async (keyword) => {
            const response = await api.author.searchAuthor(keyword)
            return response.data
        })
    },
    priceHistory: {
        getPriceHistories: createAsyncThunk('workspace/getPriceHistories', async (queries) => {
            const response = await api.priceHistory.getPriceHistories(queries)
            return response.data
        })
    }
}

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState,
    reducers: {
        addTab: (state, action) => {
            state.tabs.push({
                ...action.payload,
                id: state.tabs.length <= 0 ? 0 : state.tabs[state.tabs.length - 1].id + 1
            })
            state.selectedTab = state.tabs[state.tabs.length - 1]
        },
        selectTab: (state, action) => {
            state.selectedTab = action.payload
        },
        removeTab: (state, action) => {
            const removedTabIndex = state.tabs.findIndex(tab => tab.id === action.payload)
            let nextSelectedtab = state.selectedTab

            if (state.selectedTab.id === action.payload) {
                if (removedTabIndex - 1 >= 0) {
                    nextSelectedtab = state.tabs[removedTabIndex - 1]
                } else {
                    if (removedTabIndex + 1 < state.tabs.length) {
                        nextSelectedtab = state.tabs[removedTabIndex + 1]
                    } else {
                        nextSelectedtab = null
                    }
                }
            }

            state.tabs.splice(removedTabIndex, 1)
            state.selectedTab = nextSelectedtab
        },
        saveGenrePage: (state, action) => {
            const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
            if (!state.tabs[index]?.['data']) {
                state.tabs[index]['data'] = {}
            }
            state.tabs[index].data.page = action.payload
        },
        deleteGenre: (state, action) => {
            const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
            const deletedGenreIndex = state.tabs[index].data.getGenreData.findIndex(genre => genre.id === action.payload)
            state.tabs[index].data.getGenreData.splice(deletedGenreIndex, 1)
        },
        saveAuthorPage: (state, action) => {
            const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
            if (!state.tabs[index]?.['data']) {
                state.tabs[index]['data'] = {}
            }
            state.tabs[index].data.page = action.payload
        },
        deleteAuthor: (state, action) => {
            const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
            const deletedAuthorIndex = state.tabs[index].data.getAuthorData.findIndex(author => author.id === action.payload)
            state.tabs[index].data.getAuthorData.splice(deletedAuthorIndex, 1)
        },
        saveStoryPage: (state, action) => {
            const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
            if (!state.tabs[index]?.['data']) {
                state.tabs[index]['data'] = {}
            }
            state.tabs[index].data.page = action.payload
        },
        saveAddStoryFormData: (state, action) => {
            const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
            if (!state.tabs[index]?.['data']) {
                state.tabs[index]['data'] = {}
            }
            state.tabs[index].data.addStoryFormData = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(workspaceAsyncThunks.genre.getGenres.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['getGenreData'] = action.payload.data
            })
            .addCase(workspaceAsyncThunks.genre.deleteGenre.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                state.tabs[index]['data']['deleteGenre'] = action.payload
            })
            .addCase(workspaceAsyncThunks.genre.createGenre.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                state.tabs[index]['data']['createGenre'] = action.payload
            })
            .addCase(workspaceAsyncThunks.genre.updateGenre.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                state.tabs[index]['data']['updateGenre'] = action.payload
            })
            .addCase(workspaceAsyncThunks.genre.getGenreById.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                state.tabs[index]['data']['getGenreById'] = action.payload
            })

        builder
            .addCase(workspaceAsyncThunks.author.getAuthors.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['getAuthorData'] = action.payload.data
            })
            .addCase(workspaceAsyncThunks.author.deleteAuthor.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                state.tabs[index]['data']['deleteAuthor'] = action.payload
            })
            .addCase(workspaceAsyncThunks.author.createAuthor.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                state.tabs[index]['data']['createAuthor'] = action.payload
            })
            .addCase(workspaceAsyncThunks.author.updateAuthor.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                state.tabs[index]['data']['updateAuthor'] = action.payload
            })
            .addCase(workspaceAsyncThunks.author.getAuthorById.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                state.tabs[index]['data']['getAuthorById'] = action.payload
            })

        builder
            .addCase(workspaceAsyncThunks.story.getStories.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['getStories'] = action.payload.data
            })
            .addCase(workspaceAsyncThunks.story.updateStory.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['updateStory'] = action.payload.data
            })
            .addCase(workspaceAsyncThunks.story.createStory.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['createStory'] = action.payload
            })

        builder
            .addCase(workspaceAsyncThunks.country.getCountries.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['getCountries'] = action.payload.data
            })

        builder
            .addCase(workspaceAsyncThunks.alias.getAliases.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['getAliasesByStoryId'] = action.payload.data
            })
            .addCase(workspaceAsyncThunks.alias.createAlias.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['createAlias'] = action.payload
            })
            .addCase(workspaceAsyncThunks.alias.deleteAlias.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['deleteAlias'] = action.payload
            })

        builder
            .addCase(workspaceAsyncThunks.storyAuthor.getStoryAuthors.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['getStoryAuthorByStoryId'] = action.payload.data
            })
            .addCase(workspaceAsyncThunks.storyAuthor.createStoryAuthor.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['createStoryAuthor'] = action.payload
            })
            .addCase(workspaceAsyncThunks.storyAuthor.deleteStoryAuthor.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['deleteStoryAuthor'] = action.payload
            })
            .addCase(workspaceAsyncThunks.storyAuthor.searchAuthor.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['searchAuthor'] = action.payload
            })

        builder
            .addCase(workspaceAsyncThunks.priceHistory.getPriceHistories.fulfilled, (state, action) => {
                const index = state.tabs.findIndex(tab => tab.id == state.selectedTab.id)
                if (!state.tabs[index]?.['data']) {
                    state.tabs[index]['data'] = {}
                }
                state.tabs[index]['data']['getPriceHistory'] = action.payload
            })
            
    }
})

export const workspaceActions = workspaceSlice.actions

const genreSelectors = {
    selectGenres: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.getGenreData
    },
    selectGenrePage: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.page
    },
    selectDeleteGenre: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index].data?.deleteGenre
    },
    selectCreateGenre: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index].data?.createGenre
    },
    selectUpdateGenre: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index].data?.updateGenre
    },
    selectGetGenreById: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index].data?.getGenreById
    }
}

const authorSelectors = {
    selectAuthors: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.getAuthorData
    },
    selectAuthorPage: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.page
    },
    selectDeleteAuthor: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index].data?.deleteAuthor
    },
    selectCreateAuthor: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index].data?.createAuthor
    },
    selectUpdateAuthor: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index].data?.updateAuthor
    },
    selectGetAuthorById: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index].data?.getAuthorById
    }
}

const storySelectors = {
    selectStories: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.getStories
    },
    selectStoryPage: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.page
    },
    selectUpdateStory: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.updateStory
    },
    selectCreateStory: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.createStory
    },
    selectAddStoryFormData: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.addStoryFormData
    }
}

const countrySelectors = {
    selectCountries: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.getCountries
    }
}

const aliasSelectors = {
    selectGetAliasesByStoryId: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.getAliasesByStoryId
    },
    selectCreateAlias: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.createAlias
    },
    selectDeleteAlias: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.deleteAlias
    }
}

const storyAuthorSelectors = {
    selectGetStoryAuthorByStoryId: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.getStoryAuthorByStoryId
    },
    selectCreateStoryAuthor: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.createStoryAuthor
    },
    selectDeleteStoryAuthor: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.deleteStoryAuthor
    },
    selectSearchAuthor: state => {
        const index = state.workspace.tabs.findIndex(tab => tab.id == state.workspace.selectedTab.id)
        return state.workspace.tabs[index]?.data?.searchAuthor
    }
}

export const workspaceSelectors = {
    selectAll: state => state.workspace,
    selectSelectedTab: state => state.workspace.selectedTab,
    genreSelectors,
    authorSelectors,
    storySelectors,
    countrySelectors,
    aliasSelectors,
    storyAuthorSelectors
}

export default workspaceSlice.reducer