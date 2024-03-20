import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useEventsStore = defineStore('events', {
    state: () => ({
        members: [],
        events: [],
        organizators: [],
        event: {},
        applications: [],
        isLoading: false,
        MembersLimit: 6,
    }),
    actions: {
        async getEventId(id: String) {
            try {
                this.isLoading = true;
                const responseEvent = await HTTP.get(`/events/${id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Token ' + localStorage.getItem('Token'),
                    },
                });
                this.event = responseEvent.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getAppEvents(id: String) {
            try {
                this.isLoading = true;
                const responseEvents = await HTTP.get(
                    `/events/${id}/applications`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.applications = responseEvents.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured' + error);
            }
        },
        async getEventMembers(id: String) {
            try {
                this.isLoading = true;
                const responseMembers = await HTTP.get(
                    `/events/${id}/participants/`,
                    {
                        params: {
                            limit: this.MembersLimit,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.members = responseMembers.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getFilteredEvents(scale: String) {
            try {
                const responseFilteredEvents = await HTTP.get(
                    `/events/?scale=${scale}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.events = responseFilteredEvents.data.results;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },

        async getFilteredDirectionEvents( direction: String) {
          try {
              const responseFilteredDirectionEvents = await HTTP.get(
                  `/events/?direction=${direction}`,
                  {
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization:
                              'Token ' + localStorage.getItem('Token'),
                      },
                  },
              );
              this.events = this.events.concat(responseFilteredDirectionEvents.data.results)

          } catch (error) {
              console.log('an error occured ' + error);
          }
      },
        async getEventOrganizators(id: String) {
            try {
                this.isLoading = true;
                const responseOrg = await HTTP.get(
                    `/events/${id}/organizers/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Token ' + localStorage.getItem('Token'),
                        },
                    },
                );
                this.organizators = responseOrg.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
    },
});
