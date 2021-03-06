import { engageDetailFields } from './queries';

const setPause = `
  mutation setPause($_id: String!) {
    engageMessageSetPause(_id: $_id) {
      _id
    }
  }
`;

const setLive = `
  mutation setLive($_id: String!) {
    engageMessageSetLive(_id: $_id) {
      _id
    }
  }
`;

const setLiveManual = `
  mutation setLiveManual($_id: String!) {
    engageMessageSetLiveManual(_id: $_id) {
      _id
    }
  }
`;

const commonVariables = `
  $title: String!,
  $kind: String!,
  $method: String!,
  $fromUserId: String!,
  $isDraft: Boolean,
  $isLive: Boolean,
  $stopDate: Date,
  $segmentIds: [String],
  $brandIds: [String],
  $customerIds: [String],
  $tagIds: [String],
  $email: EngageMessageEmail,
  $scheduleDate: EngageScheduleDateInput,
  $messenger: EngageMessageMessenger,
`;

const commonParams = `
  title: $title,
  kind: $kind,
  method: $method,
  fromUserId: $fromUserId,
  isDraft: $isDraft,
  isLive: $isLive,
  stopDate: $stopDate,
  segmentIds: $segmentIds,
  tagIds: $tagIds,
  brandIds: $brandIds,
  customerIds: $customerIds,
  email: $email,
  messenger: $messenger,
  scheduleDate: $scheduleDate,
`;

const messagesAdd = `
  mutation engageMessageAdd(${commonVariables}) {
    engageMessageAdd(${commonParams}) {
      _id
      ${engageDetailFields}
    }
  }
`;

const messagesEdit = `
  mutation engageMessageEdit($_id: String!, ${commonVariables}) {
    engageMessageEdit(_id: $_id, ${commonParams}) {
      _id
      ${engageDetailFields}
    }
  }
`;

const messageRemove = `
  mutation engageMessageRemove($_id: String!) {
    engageMessageRemove(_id: $_id) {
      _id
    }
  }
`;

const segmentsAdd = `
  mutation segmentsAdd(
    $name: String!,
    $description: String,
    $subOf: String,
    $color: String,
    $connector: String,
    $conditions: [SegmentCondition],
  ) {

    segmentsAdd(
      contentType: "customer",
      name: $name,
      description: $description,
      subOf: $subOf,
      color: $color,
      connector: $connector,
      conditions: $conditions,
    ) {
      _id
    }
  }
`;

export default {
  setPause,
  setLive,
  setLiveManual,
  messageRemove,
  messagesAdd,
  messagesEdit,
  segmentsAdd
};
