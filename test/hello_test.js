describe("Testing Hello World", function() {

    it("Expect to return Hello World", function(){

        expect(hello_world()).toEqual("Hello World!");

    });

    it("Expect to return even", function(){

        expect(odd_or_even(2)).toEqual("even");

    });

    it("Expect to return odd", function(){

        expect(odd_or_even(1)).toEqual("odd");

    });

});
