const { isValidId } = require('./writeOperations');

const schemas = {
  maintenance: {
    inventoryId: { type: 'id' },
    description: { type: 'text', max: 2000 },
    scheduledDate: { type: 'date' },
    status: {
      type: 'text',
      values: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    },
    cost: { type: 'number', min: 0 },
  },
  reservations: {
    inventoryId: { type: 'id' },
    customerId: { type: 'id' },
    startDate: { type: 'date' },
    endDate: { type: 'date' },
    status: {
      type: 'text',
      values: ['pending', 'confirmed', 'completed', 'cancelled'],
    },
  },
};

function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function validateBody(collectionName, body) {
  const schema = schemas[collectionName];

  if (!schema) {
    throw new Error('Unsupported collection');
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return {
      errors: ['Request body must be a JSON object'],
      data: null,
    };
  }

  const errors = [];
  const data = {};

  for (const field of Object.keys(body)) {
    if (!Object.hasOwn(schema, field)) {
      errors.push(`Unknown field: ${field}`);
    }
  }

  for (const [field, rule] of Object.entries(schema)) {
    const value = body[field];

    if (rule.type === 'id') {
      if (!isValidId(value)) {
        errors.push(`${field} must be a valid MongoDB ID`);
      } else {
        data[field] = value;
      }
    }

    if (rule.type === 'date') {
      if (!isValidDate(value)) {
        errors.push(`${field} must be a valid date in YYYY-MM-DD format`);
      } else {
        data[field] = value;
      }
    }

    if (rule.type === 'text') {
      if (typeof value !== 'string' || value.trim() === '') {
        errors.push(`${field} is required and must be a non-empty string`);
        continue;
      }

      const text = value.trim();

      if (rule.max && text.length > rule.max) {
        errors.push(`${field} must have at most ${rule.max} characters`);
      }

      if (rule.values && !rule.values.includes(text)) {
        errors.push(`${field} must be one of: ${rule.values.join(', ')}`);
      }

      data[field] = text;
    }

    if (rule.type === 'number') {
      if (
        typeof value !== 'number' ||
        !Number.isFinite(value) ||
        value < rule.min
      ) {
        errors.push(`${field} must be a number greater than or equal to ${rule.min}`);
      } else {
        data[field] = value;
      }
    }
  }

  if (
    collectionName === 'reservations' &&
    data.startDate &&
    data.endDate &&
    data.endDate < data.startDate
  ) {
    errors.push('endDate must be on or after startDate');
  }

  return { errors, data };
}

module.exports = { isValidId, validateBody };