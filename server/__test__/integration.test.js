const request = require("supertest");
const assert = require("assert");

const app = require("../index.js"); // the express server

jest.setTimeout(10000);

describe("#1 User test (logged in)", () => {
    let agent = request.agent(app);
    let jwt = null;
    let user = {
        username: "default",
        password: "default",
    };

    beforeAll(() =>
        agent
            .post("/api/account/login")
            .set("Content-Type", "application/json")
            .send(user)
            .then((res) => {
                jwt = res.body.token;
            })
    );

    test("Test 1: Get all users", async () => {
        return agent
            .get("/api/users")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Get users successful!"));
            });
    });

    test("Test 2: Create a user", async () => {
        let testUser = {
            username: "testUser",
            password: "testUser",
            isAdmin: false,
            firstName: "testUser",
            lastName: "testUser",
        };
        return agent
            .post("/api/users/create")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(testUser)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Create user successful!"));
            });
    });

    test("Test 3: Edit a user", async () => {
        let editUser = {
            username: "editUser",
            password: "editUser",
            isAdmin: false,
            firstName: "editUser",
            lastName: "editUser",
        };
        return agent
            .post("/api/users/testUser/edit")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(editUser)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Edit user successful!"));
            });
    });

    test("Test 4: Get a user", async () => {
        return agent
            .get("/api/users/testUser")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Get user successful!"));
            });
    });

    test("Test 5: Remove a user", async () => {
        return agent
            .get("/api/users/editUser/remove")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("User removal successful!"));
            });
    });
});

describe("#2 User test (not logged in)", () => {
    let agent = request.agent(app);

    test("Test 1: Get all users", async () => {
        return agent.get("/api/users").then((res) => {
            expect(res.statusCode).toBe(401);
        });
    });
});

describe("#3 Stage test (logged in)", () => {
    let agent = request.agent(app);
    let jwt = null;
    let user = {
        username: "default",
        password: "default",
    };

    beforeAll(() =>
        agent
            .post("/api/account/login")
            .set("Content-Type", "application/json")
            .send(user)
            .then((res) => {
                jwt = res.body.token;
            })
    );

    test("Test 1: Get all stages", async () => {
        return agent
            .get("/api/stages")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Get stages successful!"));
            });
    });

    test("Test 2: Create a stage", async () => {
        let testStage = {
            sname: "test stage",
            position: "-1",
        };
        return agent
            .post("/api/stages/create")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(testStage)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Stage creation successful!"));
            });
    });

    test("Test 3: Edit a stage", async () => {
        let editStage = {
            sname: "edit stage",
            position: "-69",
        };
        return agent
            .post("/api/stages/test_stage/edit")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(editStage)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Edit stage successful!"));
            });
    });

    test("Test 4: Get a stage", async () => {
        return agent
            .get("/api/stages/edit_stage")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Get stage successful!"));
            });
    });

    test("Test 5: Remove a stage", async () => {
        return agent
            .get("/api/stages/edit_stage/remove")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Stage removal successful!"));
            });
    });
});

describe("#4 Stage test (not logged in)", () => {
    let agent = request.agent(app);

    test("Test 1: Get all stages", async () => {
        return agent.get("/api/stages").then((res) => {
            expect(res.statusCode).toBe(401);
        });
    });
});

describe("#5 Client test (logged in)", () => {
    let agent = request.agent(app);
    let jwt = null;
    let user = {
        username: "default",
        password: "default",
    };
    let nid = null;

    beforeAll(() =>
        agent
            .post("/api/account/login")
            .set("Content-Type", "application/json")
            .send(user)
            .then((res) => {
                jwt = res.body.token;
            })
    );

    test("Test 1: Get all clients", async () => {
        return agent
            .get("/api/clients")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(
                    res.body.message.includes("Get all clients successful!")
                );
            });
    });

    test("Test 2: Create a client", async () => {
        let testClient = {
            email: "test@test.test",
            address: "test address",
            phoneNumber: "test number",
            firstName: "test",
            lastName: "test",
            photoURL: "test",
            stage: "stage1",
            userReference: "default",
        };
        return agent
            .post("/api/clients/create")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(testClient)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(
                    res.body.message.includes("Client creation successful!")
                );
            });
    });

    test("Test 3: Edit a client", async () => {
        let editClient = {
            email: "edit@edit.edit",
            address: "edit address",
            phoneNumber: "edit number",
            firstName: "edit",
            lastName: "edit",
            photoURL: "edit",
            stage: "stage2",
            userReference: "default",
        };
        return agent
            .post("/api/clients/test@test.test/edit")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(editClient)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Edit client successful!"));
            });
    });

    test("Test 4: Get a client", async () => {
        return agent
            .get("/api/clients/edit@edit.edit")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Get client successful!"));
            });
    });

    test("Test 5: Add client note", async () => {
        let addClientNote = {
            note: "add client note test",
        };
        return agent
            .post("/api/clients/edit@edit.edit/addNote")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(addClientNote)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Add note successful!"));
                nid = res.body.nid;
            });
    });

    test("Test 6: Remove client note", async () => {
        let removeClientNote = {
            nid: nid,
        };
        return agent
            .post("/api/clients/edit@edit.edit/removeNote")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(removeClientNote)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Remove note successful!"));
            });
    });

    test("Test 7: Change client stage", async () => {
        let changeClientStage = {
            stageID: "stage3",
        };
        return agent
            .post("/api/clients/edit@edit.edit/changeStage")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(changeClientStage)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Change stage successful!"));
            });
    });

    test("Test 8: Remove a client", async () => {
        return agent
            .get("/api/clients/edit@edit.edit/remove")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Client removal successful!"));
            });
    });
});

describe("#6 Client test (not logged in)", () => {
    let agent = request.agent(app);

    test("Test 1: Get all clients", async () => {
        return agent.get("/api/clients").then((res) => {
            expect(res.statusCode).toBe(401);
        });
    });
});

describe("#7 Activity test (logged in)", () => {
    let agent = request.agent(app);
    let jwt = null;
    let user = {
        username: "default",
        password: "default",
    };
    let aid = null;

    beforeAll(() =>
        agent
            .post("/api/account/login")
            .set("Content-Type", "application/json")
            .send(user)
            .then((res) => {
                jwt = res.body.token;
            })
    );

    test("Test 1: Get all activities", async () => {
        return agent
            .get("/api/activities")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(
                    res.body.message.includes("Get all activities successful!")
                );
            });
    });
    test("Test 2: Create an activity", async () => {
        let testActivity = {
            clientReference: "ced@ced.com",
            userReference: "Cedric0303",
            type: "default",
            timeStart: "123",
            timeEnd: "321",
        };
        return agent
            .post("/api/activities/create")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(testActivity)
            .then((res) => {
                console.log(res.body.message);
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(
                    res.body.message.includes("Activity creation successful!")
                );
                aid = res.body.activity._id;
            });
    });

    test("Test 3: Edit an activity", async () => {
        let editActivity = {
            clientReference: "ced@ced.com",
            userReference: "Cedric0303",
            type: "default",
            timeStart: "123",
            timeEnd: "321",
        };
        return agent
            .post(`/api/activities/${aid}/edit`)
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(editActivity)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Edit activity successful!"));
            });
    });

    test("Test 4: Get an activity", async () => {
        return agent
            .get(`/api/activities/${aid}`)
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Get activity successful!"));
            });
    });

    test("Test 5: Remove an activity", async () => {
        return agent
            .get(`/api/activities/${aid}/remove`)
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(
                    res.body.message.includes("Activity removal successful!")
                );
            });
    });
});

describe("#8 Activity test (not logged in)", () => {
    let agent = request.agent(app);

    test("Test 1: Get all activities", async () => {
        return agent.get("/api/activities").then((res) => {
            expect(res.statusCode).toBe(401);
        });
    });
});

describe("#9 Order test (logged in)", () => {
    let agent = request.agent(app);
    let jwt = null;
    let user = {
        username: "default",
        password: "default",
    };
    let oid = null;

    beforeAll(() =>
        agent
            .post("/api/account/login")
            .set("Content-Type", "application/json")
            .send(user)
            .then((res) => {
                jwt = res.body.token;
            })
    );

    test("Test 1: Get all orders", async () => {
        return agent
            .get("/api/orders")
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Get all orders successful!"));
            });
    });
    test("Test 2: Create an order", async () => {
        let testOrder = {
            clientReference: "ced@ced.com",
            userReference: "Cedric0303",
            orderTotal: 123.0,
        };
        return agent
            .post("/api/orders/create")
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(testOrder)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Order creation successful!"));
                oid = res.body.order._id;
            });
    });

    test("Test 3: Edit an order", async () => {
        let editOrder = {
            clientReference: "ced@ced.com",
            userReference: "Cedric0303",
            orderTotal: 420.0,
        };
        return agent
            .post(`/api/orders/${oid}/edit`)
            .set("Authorization", "JWT " + jwt)
            .set("Content-Type", "application/json")
            .send(editOrder)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Edit order successful!"));
            });
    });

    test("Test 4: Get an order", async () => {
        return agent
            .get(`/api/orders/${oid}`)
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Get order successful!"));
            });
    });

    test("Test 5: Remove an order", async () => {
        return agent
            .get(`/api/orders/${oid}/remove`)
            .set("Authorization", "JWT " + jwt)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                assert(res.body.message.includes("Order removal successful!"));
            });
    });
});

describe("#10 Order test (not logged in)", () => {
    let agent = request.agent(app);

    test("Test 1: Get all orders", async () => {
        return agent.get("/api/orders").then((res) => {
            expect(res.statusCode).toBe(401);
        });
    });
});
