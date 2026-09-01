import { createContactMessage, findBranches } from '../models/contact.model.js';

/** POST /api/contact — stores a message from the contact form. */
export async function createMessage(req, res) {
  const messageId = await createContactMessage(req.body);

  res.status(201).json({
    messageId,
    message: 'Thanks for writing in. We will reply within one working day.',
  });
}

/** GET /api/contact/branches — branch addresses. */
export async function getBranches(req, res) {
  const branches = await findBranches();

  // `phones` is stored comma separated; split it so the UI can list each one.
  res.json({
    branches: branches.map((branch) => ({
      ...branch,
      phones: branch.phones.split(',').map((phone) => phone.trim()),
    })),
  });
}
