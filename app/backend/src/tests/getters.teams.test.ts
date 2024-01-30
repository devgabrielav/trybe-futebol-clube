import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teamsMock from './mocks/teams.mock';
import TeamModel from '../../src/database/models/teams.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', function () {
  beforeEach(function () { sinon.restore(); });

  it('Busca todos os times com sucesso', async function () {
    const mockBuild = TeamModel.bulkBuild(teamsMock.teamsMock);
    sinon.stub(TeamModel, 'findAll').resolves(mockBuild);
    const response = await chai.request(app).get('/teams').send();

    expect(response.status).to.equal(200);
    expect(response.body).to.eql(teamsMock.teamsMock);
  });

  it('Busca um time pelo id com sucesso', async function () {
    const mockBuild = TeamModel.build(teamsMock.teamMock);
    sinon.stub(TeamModel, 'findOne').resolves(mockBuild);
    const response = await chai.request(app).get(`/teams/${teamsMock.teamMock.id}`).send();

    expect(response.status).to.equal(200);
    expect(response.body).to.eql(teamsMock.teamMock);
  });
});
