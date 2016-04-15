;(function (define) {
    'use strict';

    define([
        'js/learner_dashboard/views/collection_list_view',
        'js/learner_dashboard/views/sidebar_view',
        'js/learner_dashboard/views/program_card_view',
        'js/learner_dashboard/collections/program_collection',
        'js/learner_dashboard/collections/program_progress_collection'
    ],
    function (CollectionListView, SidebarView, ProgramCardView, ProgramCollection, ProgressCollection) {
        return function (options) {
            options = {
                programsData:[
                    {
                        category: 'xseries',
                        status: 'active',
                        subtitle: 'program 1',
                        name: 'test program 1',
                        organizations: [
                            {
                                display_name: 'edX',
                                key: 'edx'
                            }
                        ],
                        created: '2016-03-03T19:18:50.061136Z',
                        modified: '2016-03-25T13:45:21.220732Z',
                        marketing_slug: 'p_2?param=haha&test=b', 
                        id: 146,
                        marketing_url: 'http://www.edx.org/xseries/p_2?param=haha&test=b',
                        banner_image_urls: {
                            w348h116: 'http://www.edx.org/images/org1/test1',
                            w435h145: 'http://www.edx.org/images/org1/test2',
                            w726h242: 'http://www.edx.org/images/org1/test3'
                        }
                    },
                    {
                        category: 'xseries',
                        status: 'active',
                        subtitle: 'fda',
                        name: 'fda',
                        organizations: [
                            {
                                display_name: 'edX', 
                                key: 'edx'
                            }
                        ],
                        created: '2016-03-09T14:30:41.484848Z',
                        modified: '2016-03-09T14:30:52.840898Z',
                        marketing_slug: 'gdaf', 
                        id: 147,
                        marketing_url: 'http://www.edx.org/xseries/gdaf',
                        banner_image_urls: {
                            w348h116: 'http://www.edx.org/images/org2/test1',
                            w435h145: 'http://www.edx.org/images/org2/test2',
                            w726h242: 'http://www.edx.org/images/org2/test3'
                        }
                    }
                ],
                userProgress: [
                    {
                        programId: 146,
                        completed: 4,
                        in_progress: 2,
                        not_started : 2
                    },
                    {
                        programId: 147,
                        completed: 5,
                        in_progress: 1,
                        not_started: 0
                    }
                ],
                xseriesUrl: '/'
            };
            var progressCollection = new ProgressCollection();
            progressCollection.set(options.userProgress);
            options.progressCollection = progressCollection; 

            new CollectionListView({
                el: '.program-cards-container',
                childView: ProgramCardView,
                collection: new ProgramCollection(options.programsData),
                context: options
            }).render();

            new SidebarView({
                el: '.sidebar',
                context: options
            }).render();
        };
    });
}).call(this, define || RequireJS.define);
