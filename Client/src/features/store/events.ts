import { defineStore } from 'pinia';
import { HTTP } from '@app/http';

export const useEventsStore = defineStore('events', {
    state: () => ({
        members: [],
        status: {},
        events: [],
        organizators: [],
        event: {},
        applications: [],
        groupApplications: [],
        isLoading: false,
        totalEvents: 0,
        MembersLimit: 7,
        eventsLimit: 4,
        nextEvents: '',
    }),
    actions: {
        async getEventId(id: String) {
            try {
                this.isLoading = true;
                const responseEvent = await HTTP.get(`/events/${id}/`);
                this.event = responseEvent.data;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getStatus(eventId: String, userId: String) {
            try {

                const responseStatus = await HTTP.get(
                    `/events/${eventId}/user_status/${userId}/`);
                this.status = responseStatus.data;

            } catch (error) {
                console.log('an error occured' + error);
            }
        },
        async getAppEvents(id: String) {
            try {
                this.isLoading = true;
                const responseEvents = await HTTP.get(
                    `/events/${id}/applications`);
                this.applications = responseEvents.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured' + error);
            }
        },

        async getGroupApp(id: String) {
            try {
                this.isLoading = true;
                const responseGroupEvents = await HTTP.get(
                    `/events/${id}/group_applications/all/`);
                this.groupApplications = responseGroupEvents.data.results;
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
                    },
                );
                this.members = responseMembers.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
        async getFilteredEvents(scale: String, direction: String) {
            try {
                const responseFilteredEvents = await HTTP.get(
                    `/events/?scale_or_direction=scale=${scale}|direction=${direction}`,
                    {
                        params: {
                            limit: this.eventsLimit,
                        },
                    },
                );
                this.totalEvents = responseFilteredEvents.data.count;
                this.events = responseFilteredEvents.data.results;
                this.nextEvents = responseFilteredEvents.data.next;
            } catch (error) {
                console.log('an error occured ' + error);
            }
        },

        async getNextFilteredEvents() {
            try {
                this.isLoading = true;

                const responseFilteredEventsNext = await HTTP.get(
                    this.nextEvents.replace('http', 'https'));

                this.events = this.events.concat(
                    responseFilteredEventsNext.data.results,
                );
                this.nextEvents = responseFilteredEventsNext.data.next;
            } catch (error) {
                console.log('an error occured' + error);
            }
        },
        async getEventOrganizators(id: String) {
            try {
                this.isLoading = true;
                const responseOrg = await HTTP.get(
                    `/events/${id}/organizers/`);
                this.organizators = responseOrg.data.results;
                this.isLoading = false;
            } catch (error) {
                this.isLoading = false;
                console.log('an error occured ' + error);
            }
        },
    },
});
