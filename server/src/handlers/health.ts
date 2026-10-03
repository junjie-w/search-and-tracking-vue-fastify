import { FastifyRequest, FastifyReply } from 'fastify';
import { HealthResponse } from '../types.js';

export const getHealth = async (_request: FastifyRequest, _reply: FastifyReply): Promise<HealthResponse> => {
  return { status: 'up' };
};
