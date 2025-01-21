import { ref, Ref, computed } from 'vue';
import { HTTP } from '@app/http';

interface Squad {
  id: number;
  name: string;
  emblem: string | null;
  founding_date: string;
  members_count: number;
  participants_count: number | null;
  events_count: number | null;
  educational_headquarter: number | null;
  local_headquarter: number | null;
  regional_headquarter: number | null;
  region: number;
  educational_institution: number | null;
}

interface Participant {
  id: string;
  user: User;
  position: {
    id: string;
    name: string;
  };
  is_trusted: boolean;
}

interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar?: {
      photo: string | null;
    };
    email?: string;
    phone_number?: string | null;
    date_of_birth?: string;
    membership_fee?: boolean;
    is_verified: boolean;
    patronymic_name?: string;
}

export default function useSquadParticipants(squadId: Ref<string>) {
  const squad = ref<Squad | null>(null);
  const members = ref<Participant[]>([]);
  const verifiedMembers = ref<User[]>([]);

  const fetchSquadData = async (id: string) => {
    try {
      const response = await HTTP.get(`/detachments/${id}/`);
      squad.value = response.data;
    } catch (error) {
      console.error('An error occurred while fetching squad data:', error);
    }
  };

  const Members = async (id: string) => {
    try {
      const response = await HTTP.get(`/detachments/${id}/members/`);
      members.value = response.data.results;
      console.log('Members:', members.value);
    } catch (error) {
      console.error('An error occurred while fetching members:', error);
    }
  }

  const fetchVerifiedMembers = async (id: string) => {
    try {
      const response = await HTTP.get(`/detachments/${id}/applications/`);
      verifiedMembers.value = response.data;
      console.log('Raw response data:', response.data);
  
    } catch (error) {
      console.error('An error occurred while fetching verified members:', error);
      verifiedMembers.value = [];
    }
  };
  // Fetch initial data
  fetchSquadData(squadId.value);
  Members(squadId.value);

  return {
    squad: computed(() => squad.value),
    members: computed(() => members.value),
    verifiedMembers: computed(() => verifiedMembers.value),
    fetchVerifiedMembers,
  };
}