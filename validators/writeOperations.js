const schemas = {
  inventory: {
    name: { type: 'string', max: 150 },
    description: { type: 'string', max: 2000 },
    category: { type: 'string', max: 100 },
    serialNumber: { type: 'string', max: 100 },
    dailyRate: { type: 'number', min: 0 },
    status: {
      type: 'string',
      max: 20,
      values: ['available', 'rented', 'maintenance'],
    },
    condition: { type: 'string', max: 500 },
  },
  customers: {
    firstName: { type: 'string', max: 100 },
    lastName: { type: 'string', max: 100 },
    email: { type: 'string', max: 254, email: true },
    phone: { type: 'string', max: 50 },
  },
};

function isValidId(id) {
  return typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
}

function validateBody(resource, body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return {
      errors: ['Request body must be a JSON object'],
      data: null,
    };
  }

  const schema = schemas[resource];
  const errors = [];
  const data = {};

  for (const field of Object.keys(body)) {
    if (!Object.hasOwn(schema, field)) {
      errors.push(`Unknown field: ${field}`);
    }
  }

  for (const [field, rule] of Object.entries(schema)) {
    const value = body[field];

    if (rule.type === 'string') {
      if (typeof value !== 'string' || value.trim() === '') {
        errors.push(`${field} is required and must be a non-empty string`);
        continue;
      }

      const text = value.trim();

      if (text.length > rule.max) {
        errors.push(`${field} must have at most ${rule.max} characters`);
      }

      if (rule.values && !rule.values.includes(text)) {
        errors.push(`${field} must be one of: ${rule.values.join(', ')}`);
      }

      if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        errors.push(`${field} must be a valid email address`);
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
        continue;
      }

      data[field] = value;
    }
  }

  return { errors, data };
}

module.exports = { isValidId, validateBody };