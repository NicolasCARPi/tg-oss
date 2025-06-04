import { filterLocalEntitiesToHasura } from "./filterLocalEntitiesToHasura";

describe("filterLocalEntitiesToHasura", () => {
  const records = [
    {
      id: 123,
      name: "John Doe",
      age: 30,
      is_active: true,
      city: "London",

      tags: ["programming", "javascript"],
      email: "john@example.com",
      data: { category: "A", type: "X" },
      username: "john123"
    },
    {
      id: 456,
      name: "Jane Smith",
      age: 25,
      is_active: false,
      city: "Paris",
      tags: ["javascript", "python"],
      email: null,
      data: { category: "B", type: "Y" },
      username: "jane456"
    },
    {
      id: 789,
      name: "Alice Johnson",
      age: 35,
      is_active: true,
      city: "London",
      tags: ["programming", "python", "java"],
      email: "alice@example.com",
      data: { category: "A", type: "Z" },
      username: "alice789"
    },
    {
      id: 101,
      name: "Bob Williams",
      age: 20,
      is_active: false,
      city: "New York",
      tags: ["java"],
      email: "bob@example.com",
      data: { category: "C", type: "X" },
      username: "bob101"
    }
  ];

  it("should filter by _eq", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { id: { _eq: 123 } }
    });
    expect(result.entities).toEqual([records[0]]);
    expect(result.entitiesAcrossPages).toEqual([records[0]]);
    expect(result.entityCount).toBe(1);
  });

  it("should filter by _neq", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { id: { _neq: 123 } }
    });
    expect(result.entities).toEqual(records.slice(1));
    expect(result.entitiesAcrossPages).toEqual(records.slice(1));
    expect(result.entityCount).toBe(3);
  });

  it("should filter by _gt", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { age: { _gt: 30 } }
    });
    expect(result.entities).toEqual([records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[2]]);
    expect(result.entityCount).toBe(1);
  });

  it("should filter by _gte", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { age: { _gte: 30 } }
    });
    expect(result.entities).toEqual([records[0], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by _lt", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { age: { _lt: 25 } }
    });
    expect(result.entities).toEqual([records[3]]);
    expect(result.entitiesAcrossPages).toEqual([records[3]]);
    expect(result.entityCount).toBe(1);
  });

  it("should filter by _lte", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { age: { _lte: 25 } }
    });
    expect(result.entities).toEqual([records[1], records[3]]);
    expect(result.entitiesAcrossPages).toEqual([records[1], records[3]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by _like", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { name: { _like: "%John%" } }
    });
    expect(result.entities).toEqual([records[0], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by _ilike", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { name: { _ilike: "%john%" } }
    });
    expect(result.entities).toEqual([records[0], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by _nlike", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { name: { _nlike: "%John%" } }
    });
    expect(result.entities).toEqual([records[1], records[3]]);
    expect(result.entitiesAcrossPages).toEqual([records[1], records[3]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by _nilike", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { name: { _nilike: "%john%" } }
    });
    expect(result.entities).toEqual([records[1], records[3]]);
    expect(result.entitiesAcrossPages).toEqual([records[1], records[3]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by _starts_with", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { name: { _starts_with: "John" } }
    });
    expect(result.entities).toEqual([records[0]]);
    expect(result.entitiesAcrossPages).toEqual([records[0]]);
    expect(result.entityCount).toBe(1);
  });

  it("should filter by _ends_with", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { name: { _ends_with: "Doe" } }
    });
    expect(result.entities).toEqual([records[0]]);
    expect(result.entitiesAcrossPages).toEqual([records[0]]);
    expect(result.entityCount).toBe(1);
  });

  it("should filter by _is_null", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { email: { _is_null: true } }
    });
    expect(result.entities).toEqual([records[1]]);
    expect(result.entitiesAcrossPages).toEqual([records[1]]);
    expect(result.entityCount).toBe(1);
  });

  it("should filter by _is_null false", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { email: { _is_null: false } }
    });
    expect(result.entities).toEqual([records[0], records[2], records[3]]);
    expect(result.entitiesAcrossPages).toEqual([
      records[0],
      records[2],
      records[3]
    ]);
    expect(result.entityCount).toBe(3);
  });

  it("should filter by _and", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        _and: [{ age: { _gt: 25 } }, { city: { _eq: "London" } }]
      }
    });
    expect(result.entities).toEqual([records[0], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by _or", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        _or: [{ city: { _eq: "London" } }, { city: { _eq: "Paris" } }]
      }
    });
    expect(result.entities).toEqual([records[0], records[1], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([
      records[0],
      records[1],
      records[2]
    ]);
    expect(result.entityCount).toBe(3);
  });

  it("should filter by _not", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        _not: { is_active: { _eq: true } }
      }
    });
    expect(result.entities).toEqual([records[1], records[3]]);
    expect(result.entitiesAcrossPages).toEqual([records[1], records[3]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by _contains", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        tags: { _contains: ["programming", "javascript"] }
      }
    });
    expect(result.entities).toEqual([records[0]]);
    expect(result.entitiesAcrossPages).toEqual([records[0]]);
    expect(result.entityCount).toBe(1);
  });

  it("should filter by _contained_in", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        tags: { _contained_in: ["programming", "javascript", "python", "java"] }
      }
    });
    expect(result.entities).toEqual(records);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should filter by _has_key", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { data: { _has_key: "category" } }
    });
    expect(result.entities).toEqual(records);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should filter by _has_keys_any", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        data: { _has_keys_any: ["category", "missingKey"] }
      }
    });
    expect(result.entities).toEqual(records);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should filter by _has_keys_all", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        data: { _has_keys_all: ["category", "type"] }
      }
    });
    expect(result.entities).toEqual(records);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should filter by _similar", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        username: { _similar: "(john|alice)%" }
      }
    });
    expect(result.entities).toEqual([records[0], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by range _gte and _lte", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { age: { _gte: 25, _lte: 30 } }
    });
    expect(result.entities).toEqual([records[0], records[1]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[1]]);
    expect(result.entityCount).toBe(2);
  });

  it("should filter by range _gt and _lt", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { age: { _gt: 25, _lt: 35 } }
    });
    expect(result.entities).toEqual([records[0]]);
    expect(result.entitiesAcrossPages).toEqual([records[0]]);
    expect(result.entityCount).toBe(1);
  });
  it("should filter with nested filters in _and and _or properly ", () => {
    const result = filterLocalEntitiesToHasura(
      [
        {
          id: 1,
          type: {
            special: "01"
          }
        },
        {
          id: 2,
          type: {
            special: "02"
          }
        }
      ],
      {
        where: {
          _and: [
            {
              type: {
                special: {
                  _ilike: "%01%"
                }
              }
            }
          ],
          _or: []
        }
      }
    );
    expect(result.entities).toEqual([
      {
        id: 1,
        type: {
          special: "01"
        }
      }
    ]);
    expect(result.entitiesAcrossPages).toEqual([
      {
        id: 1,
        type: {
          special: "01"
        }
      }
    ]);
    expect(result.entityCount).toBe(1);
  });

  it("should handle empty where clause", () => {
    const result = filterLocalEntitiesToHasura(records, {});
    expect(result.entities).toEqual(records);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });
  it("should handle empty _and and _or clauses", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { _and: [], _or: [] }
    });
    expect(result.entities).toEqual(records);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should handle nested _and and _or", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: {
        _and: [
          { _or: [{ city: { _eq: "London" } }, { city: { _eq: "Paris" } }] },
          { age: { _gt: 20 } }
        ]
      }
    });
    expect(result.entities).toEqual([records[0], records[1], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([
      records[0],
      records[1],
      records[2]
    ]);
    expect(result.entityCount).toBe(3);
  });
  it("should order by age ascending and put null vals last by default", () => {
    const result = filterLocalEntitiesToHasura(
      [{ id: 111, name: "Null Age", age: null, city: "Unknown" }, ...records],
      {
        order_by: { path: "age", direction: "asc" }
      }
    );
    expect(result.entities).toEqual([
      records[3],
      records[1],
      records[0],
      records[2],
      { id: 111, name: "Null Age", age: null, city: "Unknown" }
    ]);
    expect(result.entitiesAcrossPages).toEqual([
      records[3],
      records[1],
      records[0],
      records[2],
      { id: 111, name: "Null Age", age: null, city: "Unknown" }
    ]);
    expect(result.entityCount).toBe(5);
  });
  it("should not reorder ents if ordering on something that doesn't exist for any of them ", () => {
    const ents = [
      {
        name: "Tom88",
        id: "3JKXdPA4KiEqSqMswYXBE",
        type: "fail",
        howMany: "fail",
        isProtein: true,
        weather: "WAY TOO HOT"
      },
      {
        name: "Tom89 a",
        id: "18zbauHCMxFlkbGfGmRBn",
        type: "too old",
        howMany: "15",
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Tom90 a",
        id: "Nj1AFBQ-GWZ7TEvhUOsFj",
        type: "new",
        howMany: "3",
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Tom91 a",
        id: "X0a4uOF8vwofrciUfQ8Zn",
        type: "old",
        howMany: 2,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Tom92 a",
        id: "rbeGUYOa6u8tsQgK2MQKv",
        type: "new",
        howMany: 5,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Tom93",
        id: "Hq_SOIylSuFnQDyXZtojT",
        type: "old",
        howMany: 5,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Tom94 a",
        id: "XOd1GtMqr1y-dzKknfxFc",
        type: "old",
        howMany: "3",
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Tom95 a",
        id: "Bw1rASgu9XLFC7DzTFw9K",
        type: "old",
        howMany: 5,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Tom96 a",
        id: "j8pHKMzXi1n9Ce7roXP5f",
        type: "new",
        howMany: 40,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Tom97 a",
        id: "pLhv2XoDSy7tmmJI61f4-",
        type: "new",
        howMany: 40,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Tom98",
        id: "I0WqsADFT9QxZVzEDrki0",
        type: "old",
        howMany: "3",
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Tom99 a",
        id: "oTLzlqWtuYbcicyUn3LFl",
        type: "new",
        howMany: 2,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Tom100 a",
        id: "M4piV2ZfizeWmf6ZKNr_4",
        type: "new",
        howMany: 40,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Tom101 a",
        id: "E1Yr5zaY41PrmAs2uC-be",
        type: "old",
        howMany: 40,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Tom102 a",
        id: "usnFso9ObH8RZpDmOyOv4",
        type: "new",
        howMany: 40,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Tom103",
        id: "_BRQ-t0CDnlSYU3ZJ73Ca",
        type: "old",
        howMany: 2,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Tom104 a",
        id: "-wnRraVlIkY4RoaV5foeA",
        type: "old",
        howMany: "3",
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Tom105 a",
        id: "iY3jceZSdV6OrMytaKWS2",
        type: "new",
        howMany: 40,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Tom106 a",
        id: "ZrZ0Vo9qm5cu9Zf6sHZsd",
        type: "new",
        howMany: "3",
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Tom107 a",
        id: "wvmW-7Wy_WtCAAOK6mnwr",
        type: "new",
        howMany: 5,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Nancy108",
        id: "c-ht1uCS44JFSHekDvbRj",
        type: "new",
        howMany: 2,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Nancy109",
        id: "Oi3cFzKPebr7ZzYJu68w3",
        type: "new",
        howMany: 40,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Nancy110",
        id: "0z2Z29YBISe41V7DL1JYJ",
        type: "too old",
        howMany: 2,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Nancy111",
        id: "kaHP6YFgq4rNVsRpjkH5D",
        type: "new",
        howMany: 2,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Nancy112",
        id: "C-XhKDnDXmdbJ-JXnj-yn",
        type: "old",
        howMany: 5,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Agnes Byrd",
        id: "21Jd9-PxHBoHIXJ1j-Ei0",
        type: "new",
        howMany: 2,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Christopher Parks",
        id: "jzP3oWirGfd4_c5KH2VmJ",
        type: "old",
        howMany: 2,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Emily Hicks",
        id: "rV4rRcgFKOn3AhIvNgs8R",
        type: "new",
        howMany: "3",
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Amanda Quinn",
        id: "m29qs7y5yrlF2t_byAjRn",
        type: "old",
        howMany: 5,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Ola Roberts",
        id: "DqjIk7lzU6_8cw3EAkQMN",
        type: "old",
        howMany: 40,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Theresa Rogers",
        id: "XsUemLHKc5RpMmYiV3UeT",
        type: "new",
        howMany: 2,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Sylvia Jackson",
        id: "t7RhaB3SRKqkKSwAkMjwo",
        type: "old",
        howMany: 2,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Eugene Crawford",
        id: "gogZgycHEYGE8pQzFfKpn",
        type: "old",
        howMany: 40,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Josie Rodgers",
        id: "P4gDKi3su3kBT2X8Nsoj5",
        type: "old",
        howMany: 2,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Dale Nelson",
        id: "cxNmge4Mr3emklYh-mYKO",
        type: "old",
        howMany: 2,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Vera Tran",
        id: "BsNyrA-qstXd66wS-Z0hC",
        type: "new",
        howMany: 5,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Blake Tate",
        id: "pAgunZo2FNcc_zHGxCs-1",
        type: "old",
        howMany: 2,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Amy Harrison",
        id: "xn21FFjVyMD00qUMmHQ-k",
        type: "new",
        howMany: 40,
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Raymond Swanson",
        id: "lhBo3hBJYQKnhs7BIHaW0",
        type: "old",
        howMany: "3",
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Kevin Tate",
        id: "kgCPxens2N-AqSE41_CdM",
        type: "old",
        howMany: 40,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Lenora Garrett",
        id: "QsaiEKpRNErq_ZjFkedc2",
        type: "old",
        howMany: 5,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Erik Spencer",
        id: "fDzD7BVxS0W1F2e4AUmGm",
        type: "old",
        howMany: "3",
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Mildred Mann",
        id: "n3Vis7omDyOrAVeHToRt1",
        type: "old",
        howMany: 40,
        isProtein: true,
        weather: "HOT"
      },
      {
        name: "Glen Wilkerson",
        id: "cPK9vv-JfHBmNUwn8wUZI",
        type: "old",
        howMany: 40,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Ida Alvarado",
        id: "EkqcC3Lxn5O4EnebszsOu",
        type: "new",
        howMany: "3",
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Hilda Miller",
        id: "PVbWALmDv9bqr6kmsMP6g",
        type: "new",
        howMany: 5,
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Ella Douglas",
        id: "HjMy4vzzloDP9zl2EtjYv",
        type: "old",
        howMany: "3",
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Leonard McKenzie",
        id: "ZX8GMPeZMlN6_dfANi-NN",
        type: "new",
        howMany: "3",
        isProtein: true,
        weather: "rainy"
      },
      {
        name: "Lora Love",
        id: "EydnrigpkrEERB5cygoWx",
        type: "new",
        howMany: "3",
        isProtein: true,
        weather: "cloudy"
      },
      {
        name: "Charlotte Ford",
        id: "1lM9fZSEWpFl6PiNf4XkJ",
        type: "old",
        howMany: 40,
        isProtein: true,
        weather: "cloudy"
      }
    ];
    const result = filterLocalEntitiesToHasura([...ents], {
      order_by: { path: "updatedAt", direction: "desc" }
    });
    expect(result.entities).toEqual(ents);
  });
  it("should order by age desc and put null/undefined vals last by default", () => {
    const result = filterLocalEntitiesToHasura(
      [
        { id: 111, name: "Null Age", age: null, city: "Unknown" },
        { id: 1121, name: "Undefined Age", age: undefined, city: "Unknown" },
        ...records
      ],
      {
        order_by: { path: "age", direction: "desc" }
      }
    );
    expect(result.entities).toEqual([
      records[2],
      records[0],
      records[1],
      records[3],
      { id: 111, name: "Null Age", age: null, city: "Unknown" },
      { id: 1121, name: "Undefined Age", age: undefined, city: "Unknown" }
    ]);
    expect(result.entityCount).toBe(6);
  });

  it("should order by updatedAt descending, putting null/undefined vals last ", () => {
    const result = filterLocalEntitiesToHasura(
      [
        {
          name: "-10_signal",
          color: "#4ECDC4",
          isGenbankStandardType: true,
          __typename: "featureTypeOverride"
        },
        {
          name: "-35_signal",
          color: "#F7FFF7",
          isGenbankStandardType: true,
          __typename: "featureTypeOverride"
        },
        {
          name: "3'clip",
          color: "#FF6B6B",
          isGenbankStandardType: true,
          __typename: "featureTypeOverride"
        },
        {
          name: "3'UTR",
          color: "#FFE66D",
          isGenbankStandardType: true,
          __typename: "featureTypeOverride"
        },

        {
          __typename: "featureTypeOverride",
          id: "33a90fcb-fc26-406f-a6d5-41ac4ba8ea64",
          name: "lalala",
          description: null,
          color: "#81bb41",
          genbankEquivalentType: null,
          updatedAt: "2025-06-03T01:02:24.737499+00:00",
          isHidden: false,
          isCustomType: true
        }
      ],
      {
        order_by: [{ path: "updatedAt", direction: "desc", type: "timestamp" }]
      }
    );
    expect(result.entities).toEqual([
      {
        __typename: "featureTypeOverride",
        id: "33a90fcb-fc26-406f-a6d5-41ac4ba8ea64",
        name: "lalala",
        description: null,
        color: "#81bb41",
        genbankEquivalentType: null,
        updatedAt: "2025-06-03T01:02:24.737499+00:00",
        isHidden: false,
        isCustomType: true
      },
      {
        name: "-10_signal",
        color: "#4ECDC4",
        isGenbankStandardType: true,
        __typename: "featureTypeOverride"
      },
      {
        name: "-35_signal",
        color: "#F7FFF7",
        isGenbankStandardType: true,
        __typename: "featureTypeOverride"
      },
      {
        name: "3'clip",
        color: "#FF6B6B",
        isGenbankStandardType: true,
        __typename: "featureTypeOverride"
      },
      {
        name: "3'UTR",
        color: "#FFE66D",
        isGenbankStandardType: true,
        __typename: "featureTypeOverride"
      }
    ]);
  });
  it("should order by age descending, putting null/undefined vals last ", () => {
    const result = filterLocalEntitiesToHasura(
      [
        { id: 111, name: "Null Age", age: null, city: "Unknown" },
        { id: 1121, name: "Undefined Age", age: undefined, city: "Unknown" },
        ...records
      ],
      {
        order_by: { path: "age", direction: "desc" }
      }
    );
    expect(result.entities).toEqual([
      records[2],
      records[0],
      records[1],
      records[3],
      { id: 111, name: "Null Age", age: null, city: "Unknown" },
      { id: 1121, name: "Undefined Age", age: undefined, city: "Unknown" }
    ]);
  });

  it("should order by name ascending", () => {
    const result = filterLocalEntitiesToHasura(records, {
      order_by: { path: "name", direction: "asc" }
    });
    expect(result.entities).toEqual([
      records[2],
      records[3],
      records[1],
      records[0]
    ]);
    expect(result.entitiesAcrossPages).toEqual([
      records[2],
      records[3],
      records[1],
      records[0]
    ]);
    expect(result.entityCount).toBe(4);
  });

  it("should order by name descending", () => {
    const result = filterLocalEntitiesToHasura(records, {
      order_by: { path: "name", direction: "desc" }
    });
    expect(result.entities).toEqual([
      records[0],
      records[1],
      records[3],
      records[2]
    ]);
    expect(result.entitiesAcrossPages).toEqual([
      records[0],
      records[1],
      records[3],
      records[2]
    ]);
    expect(result.entityCount).toBe(4);
  });

  it("should filter and order", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { city: { _eq: "London" } },
      order_by: { path: "age", direction: "desc" }
    });
    expect(result.entities).toEqual([records[2], records[0]]);
    expect(result.entitiesAcrossPages).toEqual([records[2], records[0]]);
    expect(result.entityCount).toBe(2);
  });

  it("should handle empty order_by", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { city: { _eq: "London" } }
    });
    expect(result.entities).toEqual([records[0], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });

  it("should handle order_by with empty where", () => {
    const result = filterLocalEntitiesToHasura(records, {
      order_by: { path: "age", direction: "asc" }
    });
    expect(result.entities).toEqual([
      records[3],
      records[1],
      records[0],
      records[2]
    ]);
    expect(result.entitiesAcrossPages).toEqual([
      records[3],
      records[1],
      records[0],
      records[2]
    ]);
    expect(result.entityCount).toBe(4);
  });

  it("should apply limit", () => {
    const result = filterLocalEntitiesToHasura(records, { limit: 2 });
    expect(result.entities).toEqual([records[0], records[1]]);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should apply offset", () => {
    const result = filterLocalEntitiesToHasura(records, { offset: 2 });
    expect(result.entities).toEqual([records[2], records[3]]);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should apply limit and offset", () => {
    const result = filterLocalEntitiesToHasura(records, {
      limit: 1,
      offset: 2
    });
    expect(result.entities).toEqual([records[2]]);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should apply limit to filtered results", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { city: { _eq: "London" } },
      limit: 1
    });
    expect(result.entities).toEqual([records[0]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });

  it("should apply offset to filtered results", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { city: { _eq: "London" } },
      offset: 1
    });
    expect(result.entities).toEqual([records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });
  it("should order order well names properly, aka names a1, a11, a2, a3 should be sorted a1, a2, a3, a11", () => {
    const recordsWithNames = [
      { id: 1, name: "a1" },
      { id: 2, name: "a11" },
      { id: 3, name: "a2" },
      { id: 4, name: "a3" }
    ];
    const result = filterLocalEntitiesToHasura(recordsWithNames, {
      order_by: { path: "name", direction: "asc" }
    });
    expect(result.entities).toEqual([
      recordsWithNames[0], // a1
      recordsWithNames[2], // a2
      recordsWithNames[3], // a3
      recordsWithNames[1] // a11
    ]);
    expect(result.entityCount).toBe(4);
  });
  it("should order by multiple fields (age asc, name desc)", () => {
    // Make two of the ages the same for testing secondary sort
    const modifiedRecords = [
      records[1], // Jane Smith, age 25
      { ...records[0], age: 25 }, // John Doe, age 25
      records[2], // Alice Johnson, age 35
      records[3] // Bob Williams, age 20
    ];
    const result = filterLocalEntitiesToHasura(modifiedRecords, {
      order_by: [
        { path: "age", direction: "asc" },
        { path: "name", direction: "desc" }
      ]
    });
    expect(result.entities).toEqual([
      modifiedRecords[3], // age 20, name "Bob Williams"
      modifiedRecords[1], // age 25, name "John Doe" (name desc)
      modifiedRecords[0], // age 25, name "Jane Smith"
      modifiedRecords[2] // age 35, name "Alice Johnson"
    ]);
    expect(result.entityCount).toBe(4);
  });
  it("should apply limit and offset to filtered and ordered results", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { city: { _eq: "London" } },
      order_by: { path: "age", direction: "desc" },
      limit: 1,
      offset: 1
    });
    expect(result.entities).toEqual([records[0]]);
    expect(result.entitiesAcrossPages).toEqual([records[2], records[0]]);
    expect(result.entityCount).toBe(2);
  });

  it("should handle offset greater than array length", () => {
    const result = filterLocalEntitiesToHasura(records, { offset: 10 });
    expect(result.entities).toEqual([]);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should handle limit greater than array length", () => {
    const result = filterLocalEntitiesToHasura(records, { limit: 10 });
    expect(result.entities).toEqual(records);
    expect(result.entitiesAcrossPages).toEqual(records);
    expect(result.entityCount).toBe(4);
  });

  it("should handle isInfinite option with filtering", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { city: { _eq: "London" } },
      isInfinite: true
    });
    expect(result.entities).toEqual([records[0], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });

  it("should handle isInfinite option with filtering, limit, and offset", () => {
    const result = filterLocalEntitiesToHasura(records, {
      where: { city: { _eq: "London" } },
      limit: 1,
      offset: 1,
      isInfinite: true
    });
    expect(result.entities).toEqual([records[0], records[2]]);
    expect(result.entitiesAcrossPages).toEqual([records[0], records[2]]);
    expect(result.entityCount).toBe(2);
  });
  it("should order using custom sortFn", () => {
    // Create a custom sort function that sorts by the length of the name
    const sortByNameLength = record => record.name.length;

    const result = filterLocalEntitiesToHasura(records, {
      order_by: { sortFn: sortByNameLength, direction: "asc" }
    });

    // Expected order: "Bob Williams" (12), "John Doe" (8), "Jane Smith" (10), "Alice Johnson" (13)
    expect(result.entities).toEqual([
      records[0], // John Doe (8 chars)
      records[1], // Jane Smith (10 chars)
      records[3], // Bob Williams (12 chars)
      records[2] // Alice Johnson (13 chars)
    ]);
    expect(result.entityCount).toBe(4);
  });

  it("should order using multiple custom sortFn functions", () => {
    // Sort first by whether the user is active, then by name length
    const sortByActive = record => (record.is_active ? 1 : 0);
    const sortByNameLength = record => record.name.length;

    const result = filterLocalEntitiesToHasura(records, {
      order_by: { sortFn: [sortByActive, sortByNameLength], direction: "desc" }
    });

    // First active users (John, Alice) sorted by name length DESC
    // Then inactive users (Jane, Bob) sorted by name length DESC
    expect(result.entities).toEqual([
      records[2], // Alice Johnson (active, 13 chars)
      records[0], // John Doe (active, 8 chars)
      records[3], // Bob Williams (inactive, 12 chars)
      records[1] // Jane Smith (inactive, 10 chars)
    ]);
    expect(result.entityCount).toBe(4);
  });

  it("should handle custom sortFn with null values", () => {
    // Create test records with some null values
    const recordsWithNulls = [
      { id: 1, value: 10, name: "Item 1" },
      { id: 2, value: null, name: "Item 2" },
      { id: 3, value: 30, name: "Item 3" },
      { id: 4, value: 20, name: "Item 4" },
      { id: 5, value: null, name: "Item 5" }
    ];

    // Sort function that handles null values
    const sortByValue = record => {
      return record.value === null ? -Infinity : record.value;
    };

    const result = filterLocalEntitiesToHasura(recordsWithNulls, {
      order_by: { sortFn: sortByValue, direction: "desc" }
    });

    // Nulls should appear at the end when sorting in descending order
    expect(result.entities).toEqual([
      recordsWithNulls[2], // value: 30
      recordsWithNulls[3], // value: 20
      recordsWithNulls[0], // value: 10
      recordsWithNulls[1], // value: null
      recordsWithNulls[4] // value: null
    ]);
    expect(result.entityCount).toBe(5);
  });
  it("should order using getValueToFilterOn", () => {
    // Create a function that returns a value to sort by
    const getCustomSortValue = record => {
      // Sort by the first letter of the name
      return record.name.charAt(0);
    };

    const result = filterLocalEntitiesToHasura(records, {
      order_by: { getValueToFilterOn: getCustomSortValue, direction: "asc" }
    });

    // Expected order based on first letter: A, B, J, J
    // Since J appears twice, their original order should be preserved
    expect(result.entities).toEqual([
      records[2], // Alice
      records[3], // Bob
      records[0], // John
      records[1] // Jane
    ]);
    expect(result.entityCount).toBe(4);
  });

  it("should order using getValueToFilterOn with ownProps", () => {
    // Create a function that uses ownProps for customized sorting
    const getWeightedValue = (record, ownProps) => {
      // Create a weighted value based on age and a multiplier from ownProps
      return record.age * (ownProps.multiplier || 1);
    };

    const result = filterLocalEntitiesToHasura(records, {
      order_by: {
        getValueToFilterOn: getWeightedValue,
        direction: "desc",
        ownProps: { multiplier: 2 }
      }
    });

    // Expected order based on age * 2: 35*2, 30*2, 25*2, 20*2
    expect(result.entities).toEqual([
      records[2], // Alice Johnson (age: 35 * 2 = 70)
      records[0], // John Doe (age: 30 * 2 = 60)
      records[1], // Jane Smith (age: 25 * 2 = 50)
      records[3] // Bob Williams (age: 20 * 2 = 40)
    ]);
    expect(result.entityCount).toBe(4);
  });

  it("should handle null/undefined values in getValueToFilterOn", () => {
    const recordsWithMissingProps = [
      { id: 1, name: "Alice", customProp: 100 },
      { id: 2, name: "Bob", customProp: null },
      { id: 3, name: "Charlie" }, // customProp is undefined
      { id: 4, name: "Dave", customProp: 200 }
    ];

    // Function that uses a property that might be missing
    const getCustomPropValue = record => {
      return record.customProp;
    };

    const result = filterLocalEntitiesToHasura(recordsWithMissingProps, {
      order_by: { getValueToFilterOn: getCustomPropValue, direction: "desc" }
    });

    // Should order with valid values first, then nulls/undefined at the end
    expect(result.entities).toEqual([
      recordsWithMissingProps[3], // customProp: 200
      recordsWithMissingProps[0], // customProp: 100
      recordsWithMissingProps[2], // customProp: undefined
      recordsWithMissingProps[1] // customProp: null
    ]);
    expect(result.entityCount).toBe(4);
  });

  it("should combine getValueToFilterOn with multiple sort criteria", () => {
    // Additional records with same category but different priority
    const extendedRecords = [
      ...records,
      {
        id: 111,
        name: "Tom Jones",
        age: 40,
        is_active: true,
        city: "London",
        tags: ["sql", "management"],
        email: "tom@example.com",
        data: { category: "A", type: "X", priority: 2 },
        username: "tom111"
      },
      {
        id: 222,
        name: "Emma Brown",
        age: 28,
        is_active: true,
        city: "London",
        tags: ["design", "javascript"],
        email: "emma@example.com",
        data: { category: "A", type: "X", priority: 1 },
        username: "emma222"
      }
    ];

    // First sort by category
    const getCategoryValue = record => {
      return record.data.category;
    };

    // Then sort by priority if available, putting records without priority at the end
    const getPriorityValue = record => {
      return record.data.priority !== undefined
        ? record.data.priority
        : Number.MAX_SAFE_INTEGER;
    };

    const result = filterLocalEntitiesToHasura(extendedRecords, {
      order_by: [
        { getValueToFilterOn: getCategoryValue, direction: "asc" },
        { getValueToFilterOn: getPriorityValue, direction: "asc" }
      ]
    });

    // All category A records, ordered by priority if available
    const categoryARecords = [
      extendedRecords[5], // Emma (category A, priority 1)
      extendedRecords[4], // Tom (category A, priority 2)
      extendedRecords[0], // John (category A, no priority)
      extendedRecords[2] // Alice (category A, no priority)
    ];

    // Then category B, then category C
    expect(result.entities.slice(0, 4)).toEqual(categoryARecords);
    expect(result.entities[4]).toBe(extendedRecords[1]); // Jane (category B)
    expect(result.entities[5]).toBe(extendedRecords[3]); // Bob (category C)
    expect(result.entityCount).toBe(6);
  });
});
