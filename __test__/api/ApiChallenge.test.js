
import { getTasksChallengeApi, addTaskChallengeApi, isTaskChallengeApi, removeTaskChallengeApi } from '../../src/api/challenge';
import { API_HOST } from "../../src/utils/constants"
describe('API Functions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should get tasks challenge from API', async () => {
    const expectedTasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2'}];
    const mockResponse = { status: 200, json: jest.fn().mockResolvedValue(expectedTasks) };
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const tasks = await getTasksChallengeApi(123);

    expect(global.fetch).toHaveBeenCalledWith(`${API_HOST}/challengeuser/123`);
    expect(tasks).toEqual(expectedTasks);
  });

  it('should add a task challenge to API', async () => {
    const expectedTask = { id: 1, title: 'New Task' };
    const mockResponse = { status: 201, json: jest.fn().mockResolvedValue(expectedTask) };
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const task = await addTaskChallengeApi(123, 456);

    expect(global.fetch).toHaveBeenCalledWith(`${API_HOST}/challenge`, {
      headers: {
        'x-api-key': 'abcdef123456',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        todo_id: 123,
        user_id: 456,
        inday: expect.any(String),
        intime: expect.any(String),
      }),
    });
    expect(task).toEqual(expectedTask);
  });

  it('should check if a task challenge exists in API', async () => {
    const expectedResponse = { status: 200 };
    jest.spyOn(global, 'fetch').mockResolvedValue(expectedResponse);

    const response = await isTaskChallengeApi(123, 456);

    expect(global.fetch).toHaveBeenCalledWith(`${API_HOST}/challengeuser/123/456`);
    expect(response).toEqual(expectedResponse);
  });

  it('should remove a task challenge from API', async () => {
    const expectedResponse = { status: 200 };
    jest.spyOn(global, 'fetch').mockResolvedValue(expectedResponse);

    await removeTaskChallengeApi(123);

    expect(global.fetch).toHaveBeenCalledWith(`${API_HOST}/challenge/123`, {
      headers: {
        'x-api-key': 'abcdef123456',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
  });
});